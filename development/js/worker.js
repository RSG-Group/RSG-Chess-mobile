// self.importScripts("game.js");
import { Game, AI } from 'rsg-chess'

self.addEventListener('message', function (e) {
  if (e.data && e.data.game) {
    var bestMove = AI(4, e.data.game, true)
    console.log(e.data.game.board[7][6], bestMove)
    self.postMessage(bestMove)
  }
})
