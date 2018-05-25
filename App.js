import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { find } from "lodash";

import { Game } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";

type Props = {};
const game = Game.prototype.initializeGame();

export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      selected: null
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
    let { selected, /* playAgainstAI, isAIThinking */ } = this.state

    // if (isAIThinking) {
    //   if (window.plugins && window.plugins.toast) {
    //     window.plugins.toast.show('Plase wait while our AI is thinking...', '1750', 'bottom')
    //   }
    //   return
    // }

    if (selected) {
      // move the selected piece
      let moved = game.moveSelected(
        selected, {x: x, y: y}, this.__handlePromotion, this.__handleCheckmate, false
      )
      this.setState({ selected: null })

      // use the worker for generating AI movement

      // let last = game.turn.length - 1
      // if (moved && playAgainstAI && last >= 0 && game.turn[last].color === 'W') {
      //   worker.postMessage({ game, playAgainstAI })
      //   this.setState({ isAIThinking: true })
      // }
    } else {
      let last = game.turn.length - 1
      if (
        game.board[y][x] &&
        (last >= 0 ? game.board[y][x].color !== game.turn[last].color
          : game.board[y][x].color === 'W')
      ) {
        this.setState({ selected: game.board[y][x] })
      } else {
        game.board[y][x] && alert('Invalid Move!')
      }
    }
  }

  render() {
    const sizes = this.getSizes();
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
