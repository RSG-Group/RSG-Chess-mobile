import { Pieces } from "rsg-chess";

const validKingMoves = function (simulate) {
  var moves = [];
  var coordinates = [
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [-1, 0],
    [1, 0]
  ];
  var x = this.x;
  var y = this.y;
  var game = this.game;
  var turn = game.turn;
  var self = this;

  coordinates.forEach(function (coord) {
    var piece;
    var xx = x + coord[0];
    var yy = y + coord[1];

    if (xx < 8 && xx >= 0 && yy < 8 && yy >= 0) {
      piece = game.board[yy][xx];
      if (!piece || piece.color !== self.color) {
        moves.push({ x: xx, y: yy });
      }
    }
  });

  // Check king hasn't moved
  var kingMoved = turn.some(function (turn) {
    return turn.type === "king" && turn.color === self.color;
  });

  if (!kingMoved) {
    [[0, 2, -1], [7, 6, +1]].forEach(function (props) {
      var rookX = props[0];
      var newKingX = props[1];
      var dir = props[2];
      var rook = game.board[y][rookX];

      // Check rook on position
      if (!rook || rook.type !== "rook") return;

      // Check rook hasn't moved
      if (
        turn.some(function (ev) {
          return ev.from.x === rookX && ev.from.y === y;
        })
      )
        return;

      // Check squares empty and safe
      for (var xx = x + dir; /* HELPER CHECK */ xx < 8 && /**/ xx !== rookX; xx += dir) {
        if (game.board[y][xx]) return;
        var safe = true;
        game.board.forEach(function (ev) {
          ev.forEach(function (evv) {
            if (evv && evv.type !== "king" && evv.color !== self.color) {
              evv.getValidMoves().forEach(function (evMove) {
                if (evMove && evMove.y === y && evMove.x === xx) safe = false;
              });
            }
          });
        });
        if (!safe) return;
      }

      /// HELPER CHECK
      if (x + dir > 7 || xx > 7) return;

      var rochade = {
        x: newKingX,
        y: y,
        movePiece: {
          piece: self.game.board[y][rookX],
          from: {
            x: rookX,
            y: y
          },
          to: {
            y: y,
            x: x + dir
          }
        }
      };

      moves.push(rochade);
    });
  }

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, self);
  } else {
    validMoves = moves;
  }

  return validMoves;
};

export const simpleSEN = function (givenTurn) {
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
  this.FEN = FEN;
  this.FENboard = partsFEN[0];

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

  // for (let i = 0; i < partsFEN[5] * 2 - 1; i++) this.turn.push({});
  // this.turn.push({ color: 'W' });
  // if (partsFEN[1] === 'b') this.turn.push({ color: "B" });

  // Halfmove, en-passant and other FEN features are worked around for the puzzles to work
  // (or) aren't even implemented
}

const installPuzzleHelper = (Game) => {
  Game.prototype.initGameFEN = initGameFEN;
  Pieces.King.prototype.getValidMoves = validKingMoves;
}

let halfmoveClockMethod;
export const installPuzzleWorkarounds = (Game) => {
  /* workaround issues */
  halfmoveClockMethod = game.prototype.halfmoveClock;
  Game.prototype.halfmoveClock = () => { return 0; };
}

export default installPuzzleHelper;