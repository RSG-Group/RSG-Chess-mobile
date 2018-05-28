import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  WebView,
  ToastAndroid
} from "react-native";
import { find } from "lodash";
import firebase from "react-native-firebase";

import { Game } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";

import { html, combineParams } from "./src/AI";

type Props = {};
const game = Game.prototype.initializeGame();

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      selected: null,
      playAgainstAI: { depth: 3 },
      isAIThinking: false
    };

    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      });
    });
  }

  getSizes() {
    var { height, width } = this.state;
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
  }

  handlePress(x, y) {
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
        this.__handleCheckmate,
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
        game.board[y][x] && alert("Invalid Move!");
      }
    }
  }

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
        this.__handleCheckmate,
        false
      );

      this.setState({ isAIThinking: false });
      firebase.analytics().logEvent(`AI_move_piece`)
    }
  };

  render() {
    const sizes = this.getSizes();
    const { selected } = this.state;

    return (
      <View onLayout={this._onLayout} style={styles.container}>
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
          source={{
            html: html
          }}
          javaScriptEnabled={true}
          onMessage={this.handleMessage}
        />
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

App.defaultProps = {};
