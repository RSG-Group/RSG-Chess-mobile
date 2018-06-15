import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { Pieces } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";
import firebase from "react-native-firebase";
import getSizes from "../scripts/getSizes";
import renderCheckmateModal from "../components/CheckmateModal";
import NavigationContext from "../components/NavigationContext";
import { colorPalettes } from "../config";

export default class Play extends React.Component<Props> {
  static navigationOptions = {
    title: "Play",
    header: null,
    drawerLabel: "Play"
  };

  componentDidMount() {
    firebase.analytics().logEvent(`open_play_page`);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <NavigationContext.Consumer>
          {data => {
            const {
              width,
              height,
              self,
              game,
              selected,
              showValidMoves,
              handlePress,
              checkmate,
              lang,
              handleReplay,
              palette
            } = data;
            // To be clear:
            /// colorPalettes - array of all palettes
            // // palette - the id/name of the palette which will be dispalyed
            // // currentPaltte - object with params which will be used to configure the board
            const currentPalette = colorPalettes[palette];
            const {
              validBG,
              selectedBG,
              whiteCells,
              blackCells,
              selectedColor
            } = currentPalette.props;
            let sizes = getSizes(data.width, data.height);
            return (
              <React.Fragment>
                <View>
                  <ChessBoard
                    self={self}
                    board={game.board}
                    boardWidth={sizes.width}
                    boardHeight={sizes.height}
                    selected={selected}
                    showValidMoves={showValidMoves}
                    pieceSize={sizes.fontSize}
                    onPress={handlePress}
                    validBG={validBG}
                    selectedBG={selectedBG}
                    whiteCells={whiteCells}
                    blackCells={blackCells}
                    selectedColor={selectedColor}
                  />
                </View>
                {checkmate &&
                  renderCheckmateModal(checkmate, lang, handleReplay, () => {
                    self.setState({ checkmate: null });
                  })}
              </React.Fragment>
            );
          }}
        </NavigationContext.Consumer>
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
