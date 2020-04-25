const simpleSEN = function (givenTurn) {
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

const piecesListFEN = {
  p: 'pawn',
  n: 'knight',
  b: 'bishop',
  r: 'rook',
  q: 'queen',
  k: 'king'
}

// Note: Castling availability is not really considered in this
// puzzle helper since the move won't even be possible in the most moves
const initGameFEN = function (FEN /* string */) {
  let { board } = this;

  // clear the board
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      board[i][j] = null;
    }
  }

  let partsFEN = FEN.split(' ');
  let boardFEN = partsFEN[0].split('/');
  let x = 0, y = 0;

  boardFEN.forEach(row => {
    x = 0;
    row.split('').forEach(pieceFEN => {
      if (!isNaN(pieceFEN)) {
        for (let i = 0; i < parseInt(pieceFEN); i++) {
          this.board[y][x] = null;
          x++;
        }
      } else {
        this.piece(
          piecesListFEN[pieceFEN.toLowerCase()],
          x,
          y,
          pieceFEN === pieceFEN.toUpperCase() ? 'W' : 'B'
        )
        x++;
      }
    })
    y++;
  });

  for (let i = 0; i < partsFEN[5] * 2; i++) this.turn.push({});
  if (partsFEN[1] === 'b') this.turn.push({});

  // Halfmove, en-passant and other FEN features are worked around for the puzzles to work
  // (or) aren't even implemented
}

const installPuzzleHelper = (Game) => {
  Game.prototype.simpleSEN = simpleSEN;
  Game.prototype.initGameFEN = initGameFEN;
}

let halfmoveClockMethod;
export const installPuzzleWorkarounds = (Game) => {
  /* workaround issues */
  halfmoveClockMethod = game.prototype.halfmoveClock;
  Game.prototype.halfmoveClock = () => { return 0; };
}

export default installPuzzleHelper;