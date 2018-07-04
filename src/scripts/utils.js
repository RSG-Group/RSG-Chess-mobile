import { Game, tools } from "rsg-chess";
const pieceToAN = Game.prototype.pieceToAN;

export const generateCoordinatesChar = cell => {
  const startingCharCode = 33;
  const char = String.fromCharCode(startingCharCode + (10 * cell.y + cell.x));
  return char;
};

export const stringifyTurnsReport = turns => {
  const maxTurns = 350;
  let string = "";

  if (turns && turns.length) {
    turns.slice(-maxTurns).forEach((move, count) => {
      let fromChar = generateCoordinatesChar(move.from);
      string += fromChar;
      let toChar = generateCoordinatesChar(move.to);
      string += toChar;
    });
  }

  return string;
};

export const combineParams = (game, playAgainstAI) => {
  const board = tools.uncycleBoard(game.board);
  const turn = tools.uncycleTurns(game.turn);

  const combine = {
    board: board,
    turn: JSON.stringify(turn),
    threefold: JSON.stringify(game.threefold),
    FEN: game.FEN,
    playAgainstAI: playAgainstAI
  };

  return JSON.stringify(combine);
};
