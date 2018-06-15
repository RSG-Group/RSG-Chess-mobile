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
  handlePress,
  selectedBG,
  whiteCells,
  blackCells,
  selectedColor
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
      validBG={validBG}
      selectedBG={selectedBG}
      whiteCells={whiteCells}
      blackCells={blackCells}
      selectedColor={selectedColor}
    />
  </View>
);

export default Board;
