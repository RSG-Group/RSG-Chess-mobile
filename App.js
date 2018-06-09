import React, { Component } from "react";
import {
  View,
  Dimensions,
  WebView,
  ToastAndroid,
  NativeModules
} from "react-native";
import firebase from "react-native-firebase";
import includes from "lodash/includes";
import { createDrawerNavigator } from "react-navigation";

import { Game } from "rsg-chess";
import { html, combineParams } from "./src/scripts/AI";
import { strings } from "./src/config";
import NavigationContext from "./src/components/NavigationContext";

import Play from "./src/pages/Play";
import Settings from "./src/pages/Settings";
import About from "./src/pages/About";

type Props = {};
let game = Game.prototype.initializeGame();

// Set up Firebase
firebase.perf().setPerformanceCollectionEnabled(true);
firebase.admob().initialize("ca-app-pub-3940256099942544~3347511713");

let language = NativeModules.I18nManager.localeIdentifier.split(`_`)[0];
const supportedLangs = Object.keys(strings.languages);
if (!includes(supportedLangs, language)) language = "en";

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
      checkmate: null
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
    setTimeout(() => {
      this.setState({ checkmate: color });
      firebase.analytics().logEvent(`checkmate_event`);
    }, 5000);
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
    const { handleReplay, handlePress, NavigationComponent } = this;
    const { selected, showAds, checkmate, width, height } = this.state;
    const { lang } = this.props;

    // <View style={styles.container}>
    // </View>

    return (
      <React.Fragment>
        <NavigationContext.Provider
          value={{
            handleReplay: handleReplay,
            checkmate: checkmate,
            lang: language,
            game: game,
            width: width,
            height: height,
            selected: selected,
            showValidMoves: true,
            handlePress: handlePress,
            self: this
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
