import React, { Component } from "react";
import {
  View,
  Dimensions,
  WebView,
  ToastAndroid,
  NativeModules,
  AsyncStorage
} from "react-native";
import firebase from "react-native-firebase";
import includes from "lodash/includes";
import { createDrawerNavigator } from "react-navigation";

import { Game } from "rsg-chess";
import { html, combineParams } from "./src/scripts/AI";
import { strings, colorPalettes } from "./src/config";
import NavigationContext from "./src/components/NavigationContext";

import Play from "./src/pages/Play";
import Settings from "./src/pages/Settings";
import About from "./src/pages/About";
import SplashScreen from "react-native-splash-screen";

type Props = {};
let game = Game.prototype.initializeGame();

// Set up Firebase
firebase.perf().setPerformanceCollectionEnabled(true);

// Set up AdMob
firebase.admob().initialize("ca-app-pub-3522556458609123~4498098193");
let interstitial = firebase
  .admob()
  .interstitial("ca-app-pub-3522556458609123/5974831399");
let AdRequest = firebase.admob.AdRequest;
// request.addKeyword('foo').addKeyword('bar');
interstitial.loadAd(new AdRequest().build());
interstitial.on("onAdClosed", () => {
  interstitial.loadAd(new AdRequest().build());
});

let language = NativeModules.I18nManager.localeIdentifier.split(`_`)[0];
const supportedLangs = Object.keys(strings.languages);
if (!includes(supportedLangs, language)) language = "en";

const supportedPalettes = Object.keys(colorPalettes);

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      selected: null,
      // playAgainstAI: { depth: 4 },
      playAgainstAI: null,
      isAIThinking: false,
      checkmate: null,
      lang: language,
      palette: "default",
      rotated: false,
      showValidMoves: true
    };

    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      });
    });

    this.NavigationComponent = createDrawerNavigator({
      Play: {
        screen: Play
      },
      Settings: {
        screen: Settings
      },
      About: {
        screen: About
      }
    });
  }

  setRotation = value => {
    this.setState({
      rotated: value
    });
  };

  updateValidMovesConfig = value => {
    AsyncStorage.setItem("@RSGChess:showValidMoves", JSON.stringify(value)).then(ev => {
      this.setState({ showValidMoves: value });
      firebase.analytics().logEvent(`update_validMoves_configuration`);
    });
  };

  updateLang = value => {
    if (includes(supportedLangs, value))
      AsyncStorage.setItem("@RSGChess:lang", value).then(ev => {
        this.setState({ lang: value });
        firebase.analytics().logEvent(`update_language`);
      });
  };

  updatePalette = value => {
    if (includes(supportedPalettes, value))
      AsyncStorage.setItem("@RSGChess:palette", value).then(ev => {
        this.setState({ palette: value });
        firebase.analytics().logEvent(`update_palette`);
        firebase.analytics().logEvent(`set_${value}_palette`);
      });
  };

  componentDidMount = () => {
    // Make sure the splash screen is gone
    SplashScreen.hide();

    // Get the settings from the storage
    try {
      AsyncStorage.getItem("@RSGChess:lang").then(value => {
        if (value) {
          if (includes(supportedLangs, value)) this.setState({ lang: value });
        }
      });
    } catch (error) {
      firebase.analytics().logEvent(`language_error`);
      firebase
        .crashlytics()
        .recordError(
          0,
          `Getting error: ${error.toString()}, when trying to get the lang from the storage.`
        );
    }

    try {
      AsyncStorage.getItem("@RSGChess:showValidMoves").then(value => {
        if (value) {
          if (typeof JSON.parse(value) === "boolean")
            this.setState({ showValidMoves: JSON.parse(value) });
        }
      });
    } catch (error) {
      firebase.analytics().logEvent(`validMoves_error`);
      firebase
        .crashlytics()
        .recordError(
          0,
          `Getting error: ${error.toString()}, when trying to get the 'showValidMoves' config from the storage.`
        );
    }

    try {
      AsyncStorage.getItem("@RSGChess:palette").then(value => {
        if (value) {
          if (includes(supportedPalettes, value))
            this.setState({ palette: value });
        }
      });
    } catch (error) {
      firebase.analytics().logEvent(`palette_error`);
      firebase
        .crashlytics()
        .recordError(
          0,
          `Getting error: ${error.toString()}, when trying to get the current pallete from the storage.`
        );
    }
  };

  handlePress = (x, y) => {
    let { selected, playAgainstAI, isAIThinking } = this.state;

    if (isAIThinking) {
      ToastAndroid.show(
        "Plase wait while our AI is thinking...",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    if (selected) {
      // move the selected piece
      let moved = game.moveSelected(
        selected,
        { x: x, y: y },
        this.__handlePromotion,
        this.handleCheckmate,
        false
      );
      this.setState({ selected: null });

      // use the worker for generating AI movement

      let last = game.turn.length - 1;
      if (
        moved &&
        playAgainstAI &&
        last >= 0 &&
        game.turn[last].color === "W"
      ) {
        this.webView.injectJavaScript(
          `AI(${combineParams(game, playAgainstAI)})`
        );
        this.setState({ isAIThinking: true });
      }
    } else {
      let last = game.turn.length - 1;
      if (
        game.board[y][x] &&
        (last >= 0
          ? game.board[y][x].color !== game.turn[last].color
          : game.board[y][x].color === "W")
      ) {
        this.setState({ selected: game.board[y][x] });
      } else {
        game.board[y][x] &&
          ToastAndroid.show(
            "Invalid move...",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
      }
    }
  };

  handleReplay = () => {
    interstitial.show();
    interstitial.loadAd(new AdRequest().build());
    firebase.analytics().logEvent(`handle_replay`);

    // Set state to null and false, to reset all params
    this.setState({
      selected: null,
      // promotionParams: null,
      // welcomeDialog: true,
      checkmate: null,
      // settingsDialog: false,
      isAIThinking: false,
      playAgainstAI: null
    });

    // Initialize new game
    game = Game.prototype.initializeGame();
  };

  handleCheckmate = color => {
    this.setState({ checkmate: color });
    firebase.analytics().logEvent(`checkmate_event`);
  };

  handleMessage = msg => {
    msg = JSON.parse(msg.nativeEvent.data);

    const promoteAI = (pawn, x, y, color) => {
      game.promotePawn(pawn, x, y, color, "queen");
    };

    if (msg !== null) {
      game.moveSelected(
        game.board[msg.from.y][msg.from.x],
        msg.to,
        promoteAI,
        this.handleCheckmate,
        false
      );

      this.setState({ isAIThinking: false });
    }
  };

  render() {
    const {
      handleReplay,
      handlePress,
      NavigationComponent,
      updateLang,
      updatePalette,
      setRotation,
      updateValidMovesConfig
    } = this;

    const {
      selected,
      showAds,
      checkmate,
      width,
      height,
      lang,
      palette,
      rotated,
      showValidMoves
    } = this.state;

    // <View style={styles.container}>
    // </View>

    return (
      <React.Fragment>
        <NavigationContext.Provider
          value={{
            lang: lang,
            palette: palette,
            width: width,
            height: height,
            self: this,
            game: game,
            selected: selected,
            checkmate: checkmate,
            rotated: rotated,
            handleReplay: handleReplay,
            updatePalette: updatePalette,
            handlePress: handlePress,
            updateLang: updateLang,
            setRotation: setRotation,
            showValidMoves: showValidMoves,
            updateValidMovesConfig: updateValidMovesConfig
          }}
        >
          <NavigationComponent />
        </NavigationContext.Provider>
        <View>
          <WebView
            ref={el => (this.webView = el)}
            source={{ html: html }}
            javaScriptEnabled={true}
            onMessage={this.handleMessage}
          />
        </View>
      </React.Fragment>
    );
  }
}

App.defaultProps = {};
