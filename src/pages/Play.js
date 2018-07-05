import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import { Pieces } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";
import firebase from "react-native-firebase";
import getSizes from "../scripts/getSizes";
import NavigationContext from "../components/NavigationContext";
import renderCheckmateModal from "../components/CheckMateModal";
import renderPromotionModal from "../components/PromotionModal";
import renderSelectModeModal from "../components/SelectModeModal";
import { strings, colorPalettes, globalStyles } from "../config";
import MenuIcon from "../components/MenuIcon";

export default class Play extends React.Component<Props> {
  static navigationOptions = {
    title: "Play",
    header: null,
    drawerLabel: () => (
      <NavigationContext.Consumer>
        {data => {
          return (
            <Text style={globalStyles.drawerItemLabel}>
              {strings.play[data.lang]}
            </Text>
          );
        }}
      </NavigationContext.Consumer>
    )
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
            selectModeModal,
            selectMode
          } = data;
          // To be clear:
          /// colorPalettes - array of all palettes
          // // palette - the id/name of the palette which will be dispalyed
          // // currentPaltte - object with params which will be used to configure the board
          const currentPalette = colorPalettes[palette];
          let sizes = getSizes(data.width, data.height);
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
                  {...currentPalette.props}
                  rotated={rotated}
                />
              </View>
              {renderCheckmateModal(checkmate, lang, handleReplay, () => {
                self.setState({ checkmate: null });
              })}
              {promotionParams &&
                renderPromotionModal(
                  promotionParams,
                  lang,
                  promoteSelectedPawn
                )}
              {renderSelectModeModal(!!selectModeModal, selectMode, lang)}
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
