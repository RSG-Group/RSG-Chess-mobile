export const getSizes = state => {
  const { height, width } = state;
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
};

export const uncycleBoard = boardObject => {
  const board = [];

  for (let i = 0; i < boardObject.length; i++) {
    let row = [];
    for (let j = 0; j < boardObject[i].length; j++) {
      if (boardObject[i][j]) {
        row.push({
          char: boardObject[i][j].char,
          color: boardObject[i][j].color,
          x: boardObject[i][j].x,
          y: boardObject[i][j].y,
          type: boardObject[i][j].type,
          FENname: boardObject[i][j].FENname
        });
      } else {
        row.push(null);
      }
    }
    board.push(row);
  }

  return board;
};

export const combineParams = (game, playAgainstAI) => {
  const board = uncycleBoard(game.board);
  const combine = {
    board: board,
    turn: JSON.stringify(game.turn),
    threefold: JSON.stringify(game.threefold),
    FEN: game.FEN,
    playAgainstAI: playAgainstAI
  };

  return JSON.stringify(combine);
};
