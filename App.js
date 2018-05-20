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
      height: Dimensions.get("window").height
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

  render() {
    const sizes = this.getSizes();

    return (
      <View onLayout={this._onLayout} style={styles.container}>
        <ChessBoard
          board={game.board}
          boardWidth={sizes.width}
          boardHeight={sizes.height}
          pieceSize={sizes.fontSize}
          showValidMoves={true}
          selected={game.board[1][1]}
          self={this}
          onPress={(x, y) => {
            alert(`x: ${x}, y: ${y};`);
          }}
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
