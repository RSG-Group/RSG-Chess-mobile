import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { Pieces } from "rsg-chess";
import ChessBoard from "rsg-chess-rn-graphics";
import getSizes from "../scripts/getSizes";
import renderCheckmateModal from "../components/CheckMateModal";

export default class Play extends React.Component<Props> {
  static navigationOptions = {
    title: "Play RSG Chess",
    header: null,
    drawerLabel: "Play",
    drawerIcon: ({ tintColor }) => (
      <Text style={{ fontSize: 33 }}>{Pieces.PIECE_CHARS["rook"]["B"]}</Text>
    )
  };

  render() {
    const {
      handleReplay,
      checkmate,
      lang,
      width,
      height,
      self,
      game,
      selected,
      showValidMoves,
      handlePress
    } = this.props;
    let sizes = getSizes(width, height);

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
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
          />
        </View>
        {checkmate &&
          renderCheckmateModal(checkmate, lang, handleReplay, () => {
            self.setState({ checkmate: null });
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
