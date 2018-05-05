// self.importScripts("game.js");
import { AI } from 'rsg-chess'

self.addEventListener('message', function (e) {
  if (e.data && e.data.game && e.data.playAgainstAI) {
    var bestMove = AI(e.data.playAgainstAI.depth, e.data.game, true)
    self.postMessage(bestMove)
  }
})

// This project is written by Radi Cho and published by RSG Group
// RSG Chess
