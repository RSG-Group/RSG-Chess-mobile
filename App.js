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
import { html } from "./src/scripts/AI";
import { combineParams, stringifyTurnsReport } from "./src/scripts/utils";
import { strings, colorPalettes } from "./src/config";
import NavigationContext from "./src/components/NavigationContext";

import Play from "./src/pages/Play";
import Settings from "./src/pages/Settings";
import About from "./src/pages/About";
import NewGame from "./src/pages/NewGame";
import SplashScreen from "react-native-splash-screen";

type Props = {};
let game = Game.prototype.initializeGame();
const blankFEN = game.FEN;

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
firebase.crashlytics().setStringValue("initial_language", language);

const supportedLangs = Object.keys(strings.languages);
if (!includes(supportedLangs, language)) language = "en";

const supportedPalettes = Object.keys(colorPalettes);

export default class App extends Component<Props> {
  /// CLASS METHODS ///
  constructor() {
    super();
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      lang: language,
      palette: "default",
      rotated: false,
      showValidMoves: true,
      selected: null,
      checkmate: null,
      playAgainstAI: null,
      isAIThinking: false,
      promotionParams: null,
      selectModeModal: game.FEN === blankFEN
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
      },
      NewGame: {
        screen: NewGame
      }
    });
  }

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

  /// HELPERS ///
  setRotation = value => {
    this.setState({
      rotated: value
    });
  };

  updateValidMovesConfig = value => {
    AsyncStorage.setItem(
      "@RSGChess:showValidMoves",
      JSON.stringify(value)
    ).then(ev => {
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

  promoteAI = (pawn, x, y, color) => {
    ToastAndroid.show(
      strings.AIPromoted[this.state.lang],
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
    game.promotePawn(pawn, x, y, color, "queen");
    firebase.analytics().logEvent(`AI_promotion`);
  };

  promoteSelectedPawn = piece => {
    const { promotionParams, playAgainstAI, checkmate } = this.state;
    if (promotionParams) {
      piece = piece ? piece : "knight";
      const { x, y, color, pawn } = promotionParams;
      game.promotePawn(pawn, x, y, color, piece);
      this.setState({ promotionParams: null });
      firebase.analytics().logEvent(`promote_pawn`);
      firebase.analytics().logEvent(`promote_pawn_to_${piece}`);

      // Start the AI if there is playAgainstAI mode
      if (playAgainstAI && !checkmate) {
        this.startAI();
      }
    } else {
      firebase
        .analytics()
        .logEvent(`promotion_state_problem_type_${typeof promotionParams}`);
    }
  };

  selectMode = playAgainstAI => {
    this.setState({
      selectModeModal: false,
      playAgainstAI: playAgainstAI
    });
  };

  startAI = () => {
    this.webView.injectJavaScript(
      `AI(${combineParams(game, this.state.playAgainstAI)})`
    );

    this.setState({ isAIThinking: true });
  };

  /// EVENTS ///
  handlePress = (x, y) => {
    let {
      selected,
      playAgainstAI,
      isAIThinking,
      lang,
      checkmate,
      promotionParams
    } = this.state;

    if (isAIThinking) {
      ToastAndroid.show(
        strings.AIThinking[lang],
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }

    if (selected) {
      // move the selected piece
      let move = game.moveSelected(
        selected,
        { x: x, y: y },
        this.handlePromotion,
        this.handleCheckmate,
        false
      );

      this.setState({ selected: null });

      // use the worker for generating AI movement

      let last = game.turn.length - 1;

      if (
        move &&
        playAgainstAI &&
        last >= 0 &&
        game.turn[last].color === "W" &&
        !checkmate &&
        !move.promotion
      ) {
        this.startAI();
      }

      firebase
        .crashlytics()
        .setStringValue("turns", stringifyTurnsReport(game.turn));
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
            strings.invalidMove[lang],
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
      }
    }

    firebase.crashlytics().setStringValue("FEN", game.FEN);
    firebase
      .crashlytics()
      .setIntValue("threefold_length", game.threefold.length);
  };

  handlePromotion = (pawn, x, y, color) => {
    this.setState({
      promotionParams: {
        x: x,
        y: y,
        color: color,
        pawn: pawn
      }
    });
  };

  handleReplay = () => {
    interstitial.show();
    interstitial.loadAd(new AdRequest().build());
    firebase.analytics().logEvent(`handle_replay`);

    // Set state to null and false, to reset all params
    this.setState({
      selected: null,
      promotionParams: null,
      checkmate: null,
      isAIThinking: false,
      playAgainstAI: null,
      selectModeModal: true
    });

    // Initialize new game
    game = Game.prototype.initializeGame();
  };

  handleCheckmate = color => {
    this.setState({ checkmate: color });
    firebase.analytics().logEvent(`checkmate_event`);
    if (color === "D") {
      firebase.analytics().logEvent(`draw`);
    } else if (color === "W") {
      firebase.analytics().logEvent(`black_player_won`);
      if (this.state.playAgainstAI) {
        firebase.analytics().logEvent(`AI_won`);
      }
    } else if (color === "B") {
      firebase.analytics().logEvent(`white_player_won`);
    } else {
      firebase.analytics().logEvent(`unknown_checkmate_event`);
    }
  };

  handleMessage = msg => {
    if (msg && msg.nativeEvent.data) {
      // Track issues if any
      if (typeof msg.nativeEvent.data === "string") {
        firebase
          .crashlytics()
          .setStringValue("handleMessage_data", msg.nativeEvent.data);
      } else if (!JSON.stringify(msg.nativeEvent.data)) {
        firebase
          .crashlytics()
          .setStringValue("webView_message_type", typeof msg.nativeEvent.data);

        firebase
          .crashlytics()
          .recordError(1, "Cannot stringify message from WebView.");
      } else {
        firebase
          .crashlytics()
          .setStringValue(
            "handleMessage_data",
            JSON.stringify(msg.nativeEvent.data)
          );
      }
      // // //

      msg = JSON.parse(msg.nativeEvent.data);
      const { promoteAI } = this;

      game.moveSelected(
        game.board[msg.from.y][msg.from.x],
        msg.to,
        promoteAI,
        this.handleCheckmate,
        false
      );

      this.setState({ isAIThinking: false });
      firebase
        .crashlytics()
        .setStringValue("turns", stringifyTurnsReport(game.turn));
    } else {
      firebase.crashlytics().setStringValue("handleMessage_data", "undefined");
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
      updateValidMovesConfig,
      promoteSelectedPawn,
      selectMode
    } = this;

    return (
      <React.Fragment>
        <NavigationContext.Provider
          value={{
            self: this,
            game: game,
            handleReplay: handleReplay,
            updatePalette: updatePalette,
            handlePress: handlePress,
            updateLang: updateLang,
            setRotation: setRotation,
            updateValidMovesConfig: updateValidMovesConfig,
            promoteSelectedPawn: promoteSelectedPawn,
            selectMode: selectMode,
            ...this.state
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
