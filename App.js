// // RSG Chess, by RSG Group

// import React and RN APIs
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
// Import methods from RSG Chess
import { Game } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";
// import third party libraries, packages and modules
import { Thread } from "react-native-threads";
import { find } from "lodash";
// import local scripts
import { getSizes, stringifyBoard } from "./src/methods";

type Props = {};
const game = Game.prototype.initializeGame();

// start a new react native JS process
const thread = new Thread("./index.thread.js");
// send a message, strings only
thread.postMessage(stringifyBoard(game.board));

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      selected: null,
      isAIThinking: false,
      playAgainstAI: { depth: 2 }
    };

    Dimensions.addEventListener("change", () => {
      this.setState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
      });
    });

    thread.onmessage = (message) => {
      var bestMove = JSON.parse(message);
      game.moveSelected(game.board[bestMove.from.y][bestMove.from.x], bestMove.to, () => {}, () => {})
      this.setState({})
    };
  }

  handlePress(x, y) {
    let { selected /* playAgainstAI, isAIThinking */ } = this.state;

    // if (isAIThinking) {
    //   if (window.plugins && window.plugins.toast) {
    //     window.plugins.toast.show('Plase wait while our AI is thinking...', '1750', 'bottom')
    //   }
    //   return
    // }

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

      // let last = game.turn.length - 1
      // if (moved && playAgainstAI && last >= 0 && game.turn[last].color === 'W') {
      //   worker.postMessage({ game, playAgainstAI })
      //   this.setState({ isAIThinking: true })
      // }
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

  render() {
    const sizes = getSizes(this.state);
    const { selected } = this.state;

    return (
      <View onLayout={this._onLayout} style={styles.container}>
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
