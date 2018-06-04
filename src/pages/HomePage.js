import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  WebView,
  StatusBar,
  ToastAndroid,
  Button,
  TouchableOpacity
} from "react-native";
import find from "lodash/find";
import firebase from "react-native-firebase";
import Modal from "react-native-modal";

import Game from "rsg-chess/src/game";
import ChessBoard from "rsg-chess-rn-graphics";

import { html, combineParams } from "../scripts/AI";
import { renderCheckmateModal } from "../components/CheckMateModal";

type Props = {};
let game = Game.prototype.initializeGame();

export default class HomePage extends Component<Props> {
  static navigationOptions = {
    title: "Play RSG Chess",
    header: null
  };

  constructor() {
    super();
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      selected: null,
      // playAgainstAI: { depth: 3 },
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
  }

  getSizes = (width, height) => {
    const sizes = {};

    if (width > height) {
      sizes.height = Math.floor(height / 8.55 / 2) * 2;
      sizes.width = sizes.height;
    } else {
      sizes.width = Math.floor(width / 8.55 / 2) * 2;
      sizes.height = sizes.width;
    }
    sizes.fontSize = Math.floor(sizes.width / 1.32);

    return sizes;
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
    const { Banner, request, getSizes, handleReplay } = this;
    const { selected, showAds, width, height, checkmate } = this.state;
    let sizes = getSizes(width, height);

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View>
          <ChessBoard
            self={this}
            board={game.board}
            boardWidth={sizes.width}
            boardHeight={sizes.height}
            selected={selected}
            showValidMoves={true}
            pieceSize={sizes.fontSize}
            onPress={this.handlePress}
          />
        </View>
        <WebView
          ref={el => (this.webView = el)}
          source={{ html: html }}
          javaScriptEnabled={true}
          onMessage={this.handleMessage}
        />
        {checkmate &&
          renderCheckmateModal(checkmate, handleReplay, () => {
            this.setState({ checkmate: null });
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

HomePage.defaultProps = {};
