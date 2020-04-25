import React, { Component } from "react";
import { View, Text, StatusBar, Button } from "react-native";
import firebase from "react-native-firebase";
import NavigationContext from "../components/NavigationContext";
import { puzzles } from "../config";
import { Game } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";
import getSizes from "../scripts/getSizes";

/// /// ///
/// TODO
/// UPDATE THE PAGE TO BE RESPONSIVE FOR DIFFERENT DISPLAY SIZES
/// UPDATE THE PAGE TO BE RESPONSIVE FOR LANDSCAPE
/// UPDATE THE PAGE FOR INTERNATIONALIZATION
/// ADD PUZZLE BACK AND FORTH FUNCTIONALITY
/// INTEGRATE WITH SAVEDPREFERENCES AND INDICATE ALREADY PLAYED PUZZLES
/// TODO
/// /// ///

export default class Puzzles extends Component<Props> {
  static navigationOptions = {
    title: "Puzzles",
    header: null,
    drawerLabel: () => <View></View>,
    headerLeft: null
  };

  componentDidMount() {
    firebase.analytics().logEvent(`puzzles_page`);
  }

  render() {
    return (
      <NavigationContext.Consumer>
        {data => {
          const { width, height } = data;
          let sizes = getSizes(width, height);
          let puzzle = puzzles[0];
          let localGame = Game.prototype.initializeGame();
          localGame.initGameFEN(puzzle.fen);

          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <StatusBar hidden={true} />
              <View>
                <View style={{
                  top: 75,
                  width: sizes.width * 6,
                  position: "absolute",
                  alignSelf: "flex-start"
                }}>
                  <Text style={{ textAlign: "center", fontSize: 20, color: "black" }}>{puzzle.players}</Text>
                  <Text style={{ textAlign: "center", fontSize: 18 }}>Year played: {puzzle.date}</Text>
                </View>
                <ChessBoard
                  board={localGame.board}
                  boardWidth={sizes.width * 0.75}
                  boardHeight={sizes.height * 0.75}
                  pieceSize={sizes.fontSize * 0.75}
                />
                <View style={{
                  flexDirection: 'row',
                  width: sizes.width * 6,
                  bottom: 130,
                  position: "absolute",
                  alignSelf: "flex-start"
                }}>
                  <View style={{ flex: 1, margin: 3 }}><Button disabled title={"<"} /></View>
                  <View style={{ flex: 5, margin: 3 }}><Button title={"Play"} /></View>
                  <View style={{ flex: 1, margin: 3 }}><Button title={">"} /></View>
                </View>
              </View>
            </View>
          )
        }}
      </NavigationContext.Consumer>
    );
  }
}
