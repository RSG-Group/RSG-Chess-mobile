const simpleSEN = (givenTurn) => {
  /// VARIABLES
  // type - String | the piece which performed the given turn (e.g 'pawn')
  // piece - Object | the piece (if any) which is under attack and is removed from the board after the given turn
  let str = '', { to, type, piece } = givenTurn;

  switch (type) {
    case 'pawn':
      str += '';
      break;
    case 'rook':
      str += 'R';
      break;
    case 'knight':
      str += 'N';
      break;
    case 'bishop':
      str += 'B';
      break;
    case 'queen':
      str += 'Q';
      break;
    case 'king':
      str += 'K';
      break;
  }

  if (!!piece) str += 'x';
  str += ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][to.x];
  str += 8 - to.y;

  return str;
}

const initGameFEN = (game, FEN /* string */) => {
  let { board } = game;

  // clear the board
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      board[i][j] = null;
    }
  }

  /// * COMPLETE THE FEN TO BOARD INTEGRATION
  // e.g. rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
}

const installHelper = (game) => {
  game.prototype.simpleSEN = simpleSEN;
  game.prototype.initGameFEN = FEN => simpleSEN(game, FEN);
}