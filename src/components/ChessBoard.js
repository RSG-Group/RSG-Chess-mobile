import React from "react";
import { StatusBar, View } from "react-native";
import ChessBoard from "rsg-chess-rn-graphics";

const Board = ({
  game,
  width,
  height,
  fontSize,
  selected,
  showValidMoves,
  handlePress
}) => (
  <View>
    <ChessBoard
      self={self}
      board={game.board}
      boardWidth={width}
      boardHeight={height}
      selected={selected}
      showValidMoves={showValidMoves}
      pieceSize={fontSize}
      onPress={handlePress}
    />
  </View>
);

export default Board;
