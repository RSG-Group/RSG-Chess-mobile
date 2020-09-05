import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import ChessBoard from "rsg-chess-rn-graphics";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';
import getSizes from "../scripts/getSizes";
import NavigationContext from "../components/NavigationContext";
import renderCheckmateModal from "../components/CheckMateModal";
import renderPromotionModal from "../components/PromotionModal";
import { colorPalettes } from "../config";
import MenuIcon from "../components/MenuIcon";

export default class Play extends React.Component<Props> {
  static navigationOptions = {
    title: "Play",
    header: null,
    drawerLabel: () => <View></View>
  };

  componentDidMount() {
    firebase.analytics().logEvent(`open_play_page`);
  }

  render() {
    return (
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
            promotionParams,
            lang,
            handleReplay,
            palette,
            rotated,
            promoteSelectedPawn,
          } = data;
          // To be clear:
          /// colorPalettes - array of all palettes
          // // palette - the id/name of the palette which will be dispalyed
          // // currentPaltte - object with params which will be used to configure the board
          const currentPalette = colorPalettes[palette];
          let sizes = getSizes(width, height);
          return (
            <View
              style={[
                styles.container,
                { backgroundColor: currentPalette.background }
              ]}
            >
              <StatusBar hidden={true} />
              <MenuIcon
                navigation={this.props.navigation}
                palette={currentPalette}
              />
              {
                self.state.puzzle &&
                <Text style={{ top: 25, fontSize: 18 }}>
                  Puzzle solution for testing: {self.state.puzzle.sln}
                </Text>
              }
              <View>
                <ChessBoard
                  self={self}
                  board={game.board}
                  boardWidth={sizes.width}
                  boardHeight={sizes.height}
                  selected={selected}
                  showValidMoves={showValidMoves}
                  pieceSize={sizes.fontSize}
                  onPress={(x, y) => handlePress(x, y, this)}
                  {...currentPalette.props}
                  rotated={rotated}
                />
              </View>
              {renderCheckmateModal(checkmate, lang, () => {handleReplay(this)}, () => {
                self.setState({ checkmate: null });
              })}
              {promotionParams &&
                renderPromotionModal(
                  promotionParams,
                  lang,
                  promoteSelectedPawn
                )}
            </View>
          );
        }}
      </NavigationContext.Consumer>
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
