//
// RSG Chess
// Licensed under Apache 2.0 LICENSE

const Chess_AI = function (game){
  var board = game.board;
  // best values /bestMove & bestValue/
  var bestMove = null;
  var bestValue = -9999;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      board[i][j] && 
      board[i][j].getValidMoves()
      .forEach(function(ev, k){
        // needed variables
        var piece = board[i][j]
        var from = { x: piece.x, y: piece.y };
        var movePiece = board[ev.y][ev.x] ? {
          piece: board[ev.y][ev.x],
          from: { x: ev.x, y: ev.y },
          to: null
        } : null;
        // check for en-passant, and already captured pieces /movePiece/
        if(ev.movePiece) movePiece = ev.movePiece;
        if(movePiece) game.simpleMovePiece(movePiece.piece, movePiece.from, movePiece.to);
        // simulate the current move from .getValidMoves() array /ev/
        game.simpleMovePiece(piece, from, { x: ev.x, y: ev.y });
        // evulate the board and get the best move /boardValue > bestValue -> bestMove = {.../
        var boardValue = -evaluateBoard(board);
        if (
          boardValue > bestValue &&
          board[ev.y][ev.x].color === 'B'
        ) {
          bestValue = boardValue;
          bestMove = {
            from: {x: j, y: i},
            to: ev
          };
        }
        // return the current move /ev/
        game.simpleMovePiece(piece, { x: ev.x, y: ev.y }, from);
        if(movePiece) game.simpleMovePiece(movePiece.piece, movePiece.to, movePiece.from);
      })
    }
  }
  // return the best move
  return bestMove;
};

var evaluateBoard = function (board) {
  var totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      // calculate the current evaluation
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j]);
    }
  }
  // return the total evaluation
  return totalEvaluation;
};

var getPieceValue = function (piece) {
  if (piece === null) {
    return 0;
  }

  // get value for every piece on the board
  var getAbsoluteValue = function (piece) {
    if (piece.type === 'pawn') {
      return 10;
    } else if (piece.type === 'rook') {
      return 50;
    } else if (piece.type === 'knight') {
      return 30;
    } else if (piece.type === 'bishop') {
      return 30 ;
    } else if (piece.type === 'queen') {
      return 90;
    } else if (piece.type === 'king') {
      return 900;
    }
    throw "Unknown piece: " + piece.type;
  };

  // calculate the absolute value and return it
  var absoluteValue = getAbsoluteValue(piece, piece.color === 'W');
  return piece.color === 'W' ? absoluteValue : -absoluteValue;
};

// export the algorithm
export default Chess_AI

// Written by Radi Cho
// RSG Chess - by RSG Group