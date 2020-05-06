import React, { Component } from "react";
import { View, Text, StatusBar, Button } from "react-native";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';
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

  state = {
    pid: 0
  }

  componentDidMount() {
    firebase.analytics().logEvent(`puzzles_page`);
  }

  render() {
    return (
      <NavigationContext.Consumer>
        {data => {
          const { pid } = this.state;
          const { width, height, selectMode, restartGame } = data;
          let sizes = getSizes(width, height);
          let puzzle = puzzles[pid];
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
                  top: 65,
                  width: sizes.width * 6,
                  position: "absolute",
                  alignSelf: "flex-start"
                }}>
                  {/* TODO: STRINGS */}
                  <Text style={{ textAlign: "center", fontSize: 20, color: "black" }}>#{pid + 1}{` `}{puzzle.pls}</Text>
                  <Text style={{ textAlign: "center", fontSize: 18 }}>Price: 8 RSG; Reward: 10 RSG; Year: {puzzle.date}</Text>
                  {/* <Text style={{ textAlign: "center", fontSize: 18, fontStyle: "italic" }}>Puzzle details</Text> */}
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
                  <View style={{ flex: 1, margin: 3 }}>
                    <Button
                      title={"<"}
                      disabled={pid < 1}
                      onPress={() => {
                        this.setState({ pid: pid - 1 });
                      }} />
                  </View>
                  <View style={{ flex: 5, margin: 3 }}>
                    <Button
                      title={"Play"}
                      onPress={() => {
                        restartGame();
                        selectMode({ puzzle: puzzle });
                        firebase.analytics().logEvent(`puzzles_play`, { puzzle: puzzle.fen });
                        this.props.navigation.navigate("Play");
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, margin: 3 }}>
                    <Button
                      title={">"}
                      disabled={pid >= puzzles.length - 1}
                      onPress={() => {
                        this.setState({ pid: pid + 1 });
                      }} />
                  </View>
                </View>
              </View>
            </View>
          )
        }}
      </NavigationContext.Consumer>
    );
  }
}
