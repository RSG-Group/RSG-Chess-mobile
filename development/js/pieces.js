//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

export var PIECE_CHARS = {
  pawn: { W: "♙", B: "♟" },
  rook: { W: "♖", B: "♜" },
  knight: { W: "♘", B: "♞" },
  bishop: { W: "♗", B: "♝" },
  queen: { W: "♕", B: "♛" },
  king: { W: "♔", B: "♚" }
};

function Piece(x, y, charBase, color, game, type) {
  if (charBase) this.char = charBase[color];
  this.color = color;
  this.x = x;
  this.y = y;
  this.game = game;
  this.type = type;
  if (type) {
    var FENname = type === 'knight' ? 'n' : type.charAt(0);
    if(this.color === 'W') FENname = FENname.toUpperCase();
    this.FENname = FENname;
  }
}

Piece.empty = function () {
 return new Piece(); 
};

Piece.prototype.getValidMoves = function() {
  return [
    {x:0, y:0},
    {x:7, y:7}
  ];
};

function Pawn(x, y, color, game) {
  Piece.call(this, x, y, PIECE_CHARS.pawn, color, game, 'pawn');
}

Pawn.prototype = Piece.empty();
Pawn.prototype.getValidMoves = function(simulate) {
  var game = this.game;
  var moves = [];
  var y = this.y;
  var x = this.x;
  var turn = game.turn;
  var length = turn.length;
  var board = game.board;
  var last, turnTo, turnFrom, figX, passantLast, passantFig;
  var colorY = this.color === "W" ? y - 1 : y + 1;  
  var colorY2 = this.color === "W" ? y - 2 : y + 2;  
  var passantY2 = this.color === "W" ? 3 : 4;  
  var figXArray = [x - 1, x + 1];

  if(colorY < 8 && colorY >= 0 && !board[colorY][x]){
    moves.push({x: x, y: colorY});
    if((y == 1 || y == 6) && colorY2 < 8 && colorY2 >= 0 && !game.board[colorY2][x]){
      moves.push({x: x, y: colorY2});
    }
  }

  for (var i = 0; i < 2; i++) {
    figX = figXArray[i];
    if (colorY < 8 && colorY >= 0 && board[colorY][figX] &&
    board[colorY][figX].color !== this.color) moves.push({x: figX, y: colorY});
  }
  

  for (var i = 0; i < 2; i++) {
    figX = figXArray[i];
    last = turn[length - 1];

    if (
      last && last.to.x === figX && last.to.y === y && last.color !== this.color &&
      (last.from.y === 1 || last.from.y === 6) && (y === 3 || y === 4)
    ) {
      moves.push({
        x: figX,
        y: colorY,
        movePiece: {
          piece: game.board[y][figX],
          from: {
            x: figX,
            y: y
          },
          to: null
        }
      })

    }
  }

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, this);
  }else{
    validMoves = moves;
  }

  return validMoves;
};

Piece.pawn = function(x, y, color, game) {
  return new Pawn(x, y, color, game);
};

// //

function Rook(x, y, color, game) {
  Piece.call(this, x, y, PIECE_CHARS.rook, color, game, 'rook');
}

Rook.prototype = Piece.empty();
Rook.prototype.getValidMoves = function(simulate) {
  var game = this.game;
  var moves = [];

  [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach(function (coef) {
    var index, x, y, piece;
    for (index = 1; ; index++) {
      x = this.x + coef[0] * index;
      y = this.y + coef[1] * index;
      if (0 > y || y > 7 || 0 > x || x > 7) break;

      piece = game.board[y][x];
      if (piece && piece.color === this.color) break;

      moves.push({x: x, y: y});
      if (piece) break;
    }
  }, this);

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, this);
  }else{
    validMoves = moves;
  }

  return validMoves;
};

Piece.rook = function(x, y, color, game) {
  return new Rook(x, y, color, game);
};

// //

function Knight(x, y, color, game) {
  Piece.call(this, x, y, PIECE_CHARS.knight, color, game, 'knight');
}

Knight.prototype = Piece.empty();
Knight.prototype.getValidMoves = function(simulate) {
  var game = this.game;
  var moves = [];
  var task = false;

  var coordinates = [ [2, 1], [-2, 1], [1, 2], [-1, 2], [2, -1], [-2, -1], [1, -2], [-1, -2] ];

  var one, two;
  for (var i = 0; i < coordinates.length; i++) {
    var help = false;
    var boardPiece;
    one = coordinates[i][0];
    two = coordinates[i][1];
    
    if(this.x + one < 8 && this.x + one >= 0 && this.y + two < 8 && this.y + two >= 0){
      boardPiece = game.board[this.y + two][this.x + one];
      help = boardPiece ? boardPiece.color != this.color : true;
    }
    
    if (help) {
      moves.push({x: this.x + one, y: this.y + two});
    }
  }

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, this);
  }else{
    validMoves = moves;
  }

  return validMoves;
};

Piece.knight = function(x, y, color, game) {
  return new Knight(x, y, color, game);
};

// //

function Bishop(x, y, color, game) {
  Piece.call(this, x, y, PIECE_CHARS.bishop, color, game, 'bishop');
}

Bishop.prototype = Piece.empty();
Bishop.prototype.getValidMoves = function(simulate) {
  var game = this.game;
  var moves = [];

  [[-1, -1], [1, 1], [-1, 1], [1, -1]].forEach(function (coef) {
    var index, x, y, piece;
    for (index = 1; ; index++) {
      x = this.x + coef[0] * index;
      y = this.y + coef[1] * index;
      if (0 > y || y > 7 || 0 > x || x > 7) break;

      piece = game.board[y][x];
      if (piece && piece.color === this.color) break;

      moves.push({x: x, y: y});
      if (piece) break;
    }
  }, this);

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, this);
  }else{
    validMoves = moves;
  }

  return validMoves;
};

Piece.bishop = function(x, y, color, game) {
  return new Bishop(x, y, color, game);
};

// //

function Queen(x, y, color, game) {
  Piece.call(this, x, y, PIECE_CHARS.queen, color, game, 'queen');
}

Queen.prototype = Piece.empty();
Queen.prototype.getValidMoves = function (simulate) {
  var game = this.game;  
  var rookMoves = Rook.prototype.getValidMoves.call(this);
  var bishopMoves = Bishop.prototype.getValidMoves.call(this);
  var moves = rookMoves.concat(bishopMoves);

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, this);
  }else{
    validMoves = moves;
  }

  return validMoves;
};

Piece.queen = function(x, y, color, game) {
  return new Queen(x, y, color, game);
};

// //

function King(x, y, color, game) {
  Piece.call(this, x, y, PIECE_CHARS.king, color, game, 'king');
}

King.prototype = Piece.empty();
King.prototype.getValidMoves = function(simulate) {
  var moves = [];
  var rochade;
  var coordinates = [ [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1], [-1, 0], [1, 0] ];
  var x = this.x, y = this.y;
  var game = this.game;
  var turn = game.turn, length = turn.length;
  var self = this;

  coordinates.forEach(function (coord) {
    var piece;
    var xx = x + coord[0];
    var yy = y + coord[1];
    
    if (xx < 8 && xx >= 0 && yy < 8 && yy >= 0 ) {
      piece = game.board[yy][xx];
      if (!piece || piece.color != self.color) {
        moves.push({x: xx, y: yy});
      }
    }
  });

  // Check king hasn't moved
  var kingMoved = turn.some(function (turn) {
    return turn.type === 'king' && turn.color === self.color;
  });

  if (!kingMoved) {
    [[0, 2, -1], [7, 6, +1]].forEach(function (props) {
      var rookX = props[0];
      var newKingX = props[1];
      var dir = props[2];
      var rook = game.board[y][rookX];

      // Check rook on position
      if (!rook || !rook.type === 'rook') return;

      // Check rook hasn't moved
      if (turn.some(function (ev) {
        return ev.from.x === rookX && ev.from.y === y;
      })) return;

      // Check squares empty and safe
      for (var xx = x + dir; xx !== rookX; xx += dir) {
        if (game.board[y][xx]) return;
        var safe = true;
        game.board.forEach(function (ev) {
          ev.forEach(function (evv) {
            if (evv && evv.type !== "king" && evv.color !== self.color) {
              evv.getValidMoves().forEach(function(evMove){
                if(evMove && evMove.y === y && evMove.x === xx) safe = false;
              });
            }
          });
        });
        if(!safe) return;
      }

      var rochade = {
        x: newKingX,
        y: y,
        movePiece: {
          piece: self.game.board[y][rookX],
          from: {
            x: rookX, y: y
          },
          to: {
            y: y, x: x + dir
          }
        }
      }

      moves.push( rochade )
    });
  }

  var validMoves = [];
  if (simulate) {
    validMoves = game.simulateAndFilter(moves, self);
  }else{
    validMoves = moves;
  }

  return validMoves;
};

Piece.king = function(x, y, color, game) {
  return new King(x, y, color, game);
};

export { Piece, Pawn, Rook, Knight, Bishop, Queen, King };