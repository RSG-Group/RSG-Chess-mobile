import { self } from "react-native-threads";
import { Game, AI } from "rsg-chess";

// listen for messages
self.onmessage = message => {
  const game = Game.prototype.initializeGame();
  const incomingBoard = JSON.parse(message);
  const bestMove = AI(1, {board: incomingBoard, turn: [], threefold: []}, true);
  
  // send a message, strings only
  self.postMessage(JSON.stringify(bestMove));
};

