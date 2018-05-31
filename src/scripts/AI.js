export const html = `
<html>
  <body>
    <script>
      var PIECE_CHARS={pawn:{W:"♙",B:"♟"},rook:{W:"♖",B:"♜"},knight:{W:"♘",B:"♞"},bishop:{W:"♗",B:"♝"},queen:{W:"♕",B:"♛"},king:{W:"♔",B:"♚"}};function Piece(e,o,t,r,i,n){if(t&&(this.char=t[r]),this.color=r,this.x=e,this.y=o,this.game=i,this.type=n,n){var a="knight"===n?"n":n.charAt(0);"W"===this.color&&(a=a.toUpperCase()),this.FENname=a}}function Pawn(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.pawn,t,r,"pawn")}function Rook(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.rook,t,r,"rook")}function Knight(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.knight,t,r,"knight")}function Bishop(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.bishop,t,r,"bishop")}function Queen(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.queen,t,r,"queen")}function King(e,o,t,r){Piece.call(this,e,o,PIECE_CHARS.king,t,r,"king")}function Game(e){this.board=[];for(var o=0;o<8;o++){for(var t=[],r=0;r<8;r++)t.push(null);this.board.push(t)}this.turn=[],this.FEN=[],this.FENboard=[],this.threefold=[]}Piece.empty=function(){return new Piece},Piece.prototype.getValidMoves=function(){return[{x:0,y:0},{x:7,y:7}]},Pawn.prototype=Piece.empty(),Pawn.prototype.getValidMoves=function(e){var o,t,r=this.game,i=[],n=this.y,a=this.x,c=r.board,h=r.turn,s=h.length,p="W"===this.color?n-1:n+1,u="W"===this.color?n-2:n+2,l=(this.color,[a-1,a+1]);p<8&&p>=0&&!c[p][a]&&(i.push({x:a,y:p}),(1===n||6===n)&&u<8&&u>=0&&!r.board[u][a]&&i.push({x:a,y:u}));for(var f=0;f<2;f++)t=l[f],p<8&&p>=0&&c[p][t]&&c[p][t].color!==this.color&&i.push({x:t,y:p});for(f=0;f<2;f++)t=l[f],!(o=h[s-1])||"pawn"!==o.type||o.to.x!==t||o.to.y!==n||o.color===this.color||1!==o.from.y&&6!==o.from.y||3!==n&&4!==n||i.push({x:t,y:p,movePiece:{piece:r.board[n][t],from:{x:t,y:n},to:null}});return e?r.simulateAndFilter(i,this):i},Piece.pawn=function(e,o,t,r){return new Pawn(e,o,t,r)},Rook.prototype=Piece.empty(),Rook.prototype.getValidMoves=function(e){var o=this.game,t=[];[[-1,0],[1,0],[0,1],[0,-1]].forEach(function(e){var r,i,n,a;for(r=1;(i=this.x+e[0]*r,!((n=this.y+e[1]*r)<0||n>7||i<0||i>7))&&(!(a=o.board[n][i])||a.color!==this.color)&&(t.push({x:i,y:n}),!a);r++);},this);return e?o.simulateAndFilter(t,this):t},Piece.rook=function(e,o,t,r){return new Rook(e,o,t,r)},Knight.prototype=Piece.empty(),Knight.prototype.getValidMoves=function(e){for(var o,t,r=this.game,i=[],n=[[2,1],[-2,1],[1,2],[-1,2],[2,-1],[-2,-1],[1,-2],[-1,-2]],a=0;a<n.length;a++){var c,h=!1;o=n[a][0],t=n[a][1],this.x+o<8&&this.x+o>=0&&this.y+t<8&&this.y+t>=0&&(h=!(c=r.board[this.y+t][this.x+o])||c.color!==this.color),h&&i.push({x:this.x+o,y:this.y+t})}return e?r.simulateAndFilter(i,this):i},Piece.knight=function(e,o,t,r){return new Knight(e,o,t,r)},Bishop.prototype=Piece.empty(),Bishop.prototype.getValidMoves=function(e){var o=this.game,t=[];[[-1,-1],[1,1],[-1,1],[1,-1]].forEach(function(e){var r,i,n,a;for(r=1;(i=this.x+e[0]*r,!((n=this.y+e[1]*r)<0||n>7||i<0||i>7))&&(!(a=o.board[n][i])||a.color!==this.color)&&(t.push({x:i,y:n}),!a);r++);},this);return e?o.simulateAndFilter(t,this):t},Piece.bishop=function(e,o,t,r){return new Bishop(e,o,t,r)},Queen.prototype=Piece.empty(),Queen.prototype.getValidMoves=function(e){var o=this.game,t=Rook.prototype.getValidMoves.call(this),r=Bishop.prototype.getValidMoves.call(this),i=t.concat(r);return e?o.simulateAndFilter(i,this):i},Piece.queen=function(e,o,t,r){return new Queen(e,o,t,r)},King.prototype=Piece.empty(),King.prototype.getValidMoves=function(e){var o=[],t=this.x,r=this.y,i=this.game,n=i.turn,a=this;[[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1],[-1,0],[1,0]].forEach(function(e){var n,c=t+e[0],h=r+e[1];c<8&&c>=0&&h<8&&h>=0&&((n=i.board[h][c])&&n.color===a.color||o.push({x:c,y:h}))}),n.some(function(e){return"king"===e.type&&e.color===a.color})||[[0,2,-1],[7,6,1]].forEach(function(e){var c=e[0],h=e[1],s=e[2],p=i.board[r][c];if(p&&"rook"!==!p.type&&!n.some(function(e){return e.from.x===c&&e.from.y===r})){for(var u=t+s;u!==c;u+=s){if(i.board[r][u])return;var l=!0;if(i.board.forEach(function(e){e.forEach(function(e){e&&"king"!==e.type&&e.color!==a.color&&e.getValidMoves().forEach(function(e){e&&e.y===r&&e.x===u&&(l=!1)})})}),!l)return}var f={x:h,y:r,movePiece:{piece:a.game.board[r][c],from:{x:c,y:r},to:{y:r,x:t+s}}};o.push(f)}});return e?i.simulateAndFilter(o,a):o},Piece.king=function(e,o,t,r){return new King(e,o,t,r)},Game.prototype.piece=function(e,o,t,r){var i=Piece[e](o,t,r,this);this.board[t][o]=i,this.FEN=this.gameToFEN(),this.FENboard=this.boardToFEN()},Game.prototype.moveSelected=function(e,o,t,r,i){var n=o.x,a=o.y;if(e){var c={x:e.x,y:e.y};if(this.board[a][n]!==e){for(var h=e.getValidMoves(!i),s=null,p=0;p<h.length;p++){var u=h[p];if(u.x===n&&u.y===a){s=u;break}}if(!s)return!1;var l,f,y,m=s.movePiece;m&&(l=m.from,null===(f=m.to)?this.board[l.y][l.x]=null:(y=this.board[l.y][l.x],this.board[f.y][f.x]=y,y.x=f.x,y.y=f.y,this.board[l.y][l.x]=null));var v=this.board[a][n]?this.board[a][n]:null;m=m?s.movePiece:null,this.turn.push({from:c,to:o,color:e.color,type:e.type,piece:v,movePiece:m}),this.board[a][n]=e,this.board[e.y][e.x]=null,this.board[a][n].x=n,this.board[a][n].y=a,this.FEN=this.gameToFEN(),this.FENboard=this.boardToFEN(),this.threefold.push(this.FENboard),("pawn"===e.type||v)&&(this.threefold=[]),this.threefoldCheck()&&r("D"),this.halfmoveClock()>=50&&r("D"),"pawn"===e.type&&("W"===e.color&&0===a||"B"===e.color&&7===a)&&t&&t(e,n,a,e.color);var d="W"===e.color?"B":"W",g=this.checkmate(d);g&&r(g)}return e=null,!0}},Game.prototype.promotePawn=function(e,o,t,r,i){this.piece(i,o,t,r)},Game.prototype.simulateAndFilter=function(e,o){var t=[],r=this,i=this.board;return e.forEach(function(e,n){var a=e.y,c=e.x,h={x:o.x,y:o.y},s=i[a][c]?{piece:i[a][c],from:{x:c,y:a},to:null}:null;e.movePiece&&(s=e.movePiece),s&&r.simpleMovePiece(s.piece,s.from,s.to),r.simpleMovePiece(o,h,{x:c,y:a});var p=r.warning(o.color);r.simpleMovePiece(o,{x:c,y:a},h),s&&r.simpleMovePiece(s.piece,s.to,s.from),p||t.push(e)}),t},Game.prototype.checkmate=function(e){for(var o=0;o<8;o++)for(var t=0;t<8;t++)if(this.board[o][t]&&this.board[o][t].color===e&&this.board[o][t].getValidMoves(!0).length)return!1;return this.warning(e)?e:"D"},Game.prototype.simpleMovePiece=function(e,o,t){var r=this.board;t&&(r[t.y][t.x]=e,e.x=t.x,e.y=t.y),o&&(r[o.y][o.x]=null)},Game.prototype.simpleMove=function(e){var o=this,t=o.board,r=e.from,i=e.to,n=t[r.y][r.x],a=this.board[i.y][i.x]?this.board[i.y][i.x]:null,c=t[i.y][i.x]?{piece:t[i.y][i.x],from:{x:i.x,y:i.y},to:null}:null;return this.turn.push({from:r,to:{x:i.x,y:i.y},color:e.color,type:n.type,piece:a,movePiece:c}),i.movePiece&&(c=i.movePiece),c&&o.simpleMovePiece(c.piece,c.from,c.to),o.simpleMovePiece(n,r,{x:i.x,y:i.y}),function(){c&&o.simpleMovePiece(c.piece,c.to,c.from),o.simpleMovePiece(n,{x:i.x,y:i.y},r),a&&(t[i.y][i.x]=a),o.turn.pop()}},Game.prototype.warning=function(e){var o,t=!1;return this.board.forEach(function(t){t.forEach(function(t){t&&t.color===e&&"king"===t.type&&(o=t)})}),this.board.forEach(function(r){r.forEach(function(r){r&&r.color!==e&&r.getValidMoves().forEach(function(e){e.x===o.x&&e.y===o.y&&(t=!0)})})}),t},Game.prototype.threefoldCheck=function(){for(var e=this.threefold,o=e.length,t=0;t<o;t++){for(var r=0,i=t+1;i<o;i++)e[t]===e[i]&&(r+=1);if(r>=2)return!0}return!1},Game.prototype.pieceToAN=function(e,o){return"abcdefgh".charAt(e)+(8-o)},Game.prototype.boardToFEN=function(){for(var e=this.board,o="",t=0,r=0;r<8;r++){for(var i=0;i<8;i++)e[r][i]?(t&&(o+=t),t=0,o+=e[r][i].FENname):t++;t&&(o+=t),t=0,o+=r<7?"/":""}return o},Game.prototype.halfmoveClock=function(){var e=this.turn,o=e.length,t=0;if(0===e.length)return t;for(var r=e[o-1-t];t<=o-1&&"pawn"!==r.type&&!r.piece;)r=e[o-1-++t];return t},Game.prototype.activeColour=function(){var e=this.turn;return e.length&&"W"===e[e.length-1].color?"b":"w"},Game.prototype.castlingTarget=function(){var e,o,t=this.board,r=this.turn,i="";return r.forEach(function(t){e="king"===t.type&&"W"===t.color,o="king"===t.type&&"B"===t.color}),[[7,0],[0,0],[7,7],[0,7]].forEach(function(n){var a=n[0],c=n[1],h=t[c][a];if((7!==c||!e)&&(0!==c||!o)&&h&&"rook"!==!h.type&&!r.some(function(e){return"rook"===e.type&&(e.from.x===a&&e.from.y===c)})){var s=0===a?"q":"k";i+=0===c?s.toUpperCase():s}}),i||(i="-"),i},Game.prototype.enPassantTarget=function(){var e=this.turn,o="";if(e.length){var t=e[e.length-1];"W"===t.color&&4===t.to.y&&(o=this.pieceToAN(t.to.x,t.to.y+1)),"B"===t.color&&3===t.to.y&&(o=this.pieceToAN(t.to.x,t.to.y-1))}return o||(o="-"),o},Game.prototype.fullmoveCount=function(){var e=1;return this.turn.forEach(function(o){"B"===o.color&&(e+=1)}),e},Game.prototype.gameToFEN=function(){var e="";return e+=this.boardToFEN(),e+=" "+this.activeColour(),e+=" "+this.castlingTarget(),e+=" "+this.enPassantTarget(),e+=" "+this.halfmoveClock(),e+=" "+this.fullmoveCount()},Game.prototype.initializeGame=function(){for(var e=new Game,o=0;o<8;o++)e.piece("pawn",o,6,"W"),e.piece("pawn",o,1,"B");return e.piece("rook",0,0,"B"),e.piece("knight",1,0,"B"),e.piece("bishop",2,0,"B"),e.piece("queen",3,0,"B"),e.piece("king",4,0,"B"),e.piece("bishop",5,0,"B"),e.piece("knight",6,0,"B"),e.piece("rook",7,0,"B"),e.piece("rook",0,7,"W"),e.piece("knight",1,7,"W"),e.piece("bishop",2,7,"W"),e.piece("queen",3,7,"W"),e.piece("king",4,7,"W"),e.piece("bishop",5,7,"W"),e.piece("knight",6,7,"W"),e.piece("rook",7,7,"W"),e},Game.prototype.allMoves=function(){for(var e=this.board,o=[],t=this.activeColour().toUpperCase(),r=0;r<8;r++)for(var i=0;i<8;i++){if(e[r][i]&&e[r][i].color===t)e[r][i].getValidMoves(!0).forEach(function(t){o.push({color:e[r][i].color,from:{x:i,y:r},to:t,FENname:e[r][i].FENname})})}return o};var ChessAI=function(e,o,t){for(var r=Game.prototype.initializeGame(),i=0;i<8;i++)for(var n=0;n<8;n++)if(o.board[i][n]){var a=o.board[i][n];r.piece(a.type,n,i,a.color)}else r.board[i][n]=null;r.turn=o.turn,r.threefold=o.threefold,r.FEN=o.FEN,r.FENboard=o.FENboard;var c,h=r.allMoves(),s=-9999;for(i=0;i<h.length;i++){var p=h[i],u=r.simpleMove(p),l=minimax(e-1,r,-1e4,1e4,!t);u(),l>=s&&(s=l,c=p)}return c},minimax=function(e,o,t,r,i){if(0===e)return-evaluateBoard(o.board);var n=o.allMoves();if(i){for(var a=-9999,c=0;c<n.length;c++){var h=o.simpleMove(n[c]);if(a=Math.max(a,minimax(e-1,o,t,r,!i)),h(),r<=(t=Math.max(t,a)))return a}return a}for(a=9999,c=0;c<n.length;c++){h=o.simpleMove(n[c]);if(a=Math.min(a,minimax(e-1,o,t,r,!i)),h(),(r=Math.min(r,a))<=t)return a}return a},evaluateBoard=function(e){for(var o=0,t=0;t<8;t++)for(var r=0;r<8;r++)o+=getPieceValue(e[t][r]);return o},getPieceValue=function(e){if(null===e)return 0;var o,t=(o=e,e.color,"pawn"===o.type?10:"rook"===o.type?50:"knight"===o.type?30:"bishop"===o.type?30:"queen"===o.type?90:"king"===o.type?900:void 0);return"W"===e.color?t:-t};window.RSGChess={Game:Game,AI:ChessAI,Pieces:{PIECE_CHARS:PIECE_CHARS,pawn:Piece.pawn,rook:Piece.rook,knight:Piece.knight,bishop:Piece.bishop,queen:Piece.queen,king:Piece.king}};
    </script>
    <script>
      window.AI = function (params) {
        var bestMove = RSGChess.AI(params.playAgainstAI.depth, {board: params.board, turn: JSON.parse(params.turn)}, true);
        window.postMessage(JSON.stringify(bestMove));
      }
    </script>
  </body>
</html>
`;

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

export const uncycleTurns = turnObject => {
  const turns = [];

  turnObject.map(ev => {
    let move = {};
    move.from = ev.from;
    move.to = ev.to;
    move.color = ev.color;
    move.type = ev.type;
    move.piece = null;
    move.movePiece = null;
    if (ev.piece) {
      move.piece = {
        char: ev.piece.char,
        color: ev.piece.color,
        x: ev.piece.x,
        y: ev.piece.y,
        type: ev.piece.type,
        FENname: ev.piece.FENname
      };
    }
    if (ev.movePiece) {
      move.movePiece = {
        from: ev.movePiece.from,
        to: ev.movePiece.to,
        piece: {
          char: ev.movePiece.piece.char,
          color: ev.movePiece.piece.color,
          x: ev.movePiece.piece.x,
          y: ev.movePiece.piece.y,
          type: ev.movePiece.piece.type,
          FENname: ev.movePiece.piece.FENname
        }
      };
    }

    turns.push(move);
  });

  return turns;
};

export const combineParams = (game, playAgainstAI) => {
  const board = uncycleBoard(game.board);
  const turn = uncycleTurns(game.turn);

  const combine = {
    board: board,
    turn: JSON.stringify(turn),
    threefold: JSON.stringify(game.threefold),
    FEN: game.FEN,
    playAgainstAI: playAgainstAI
  };

  return JSON.stringify(combine);
};
