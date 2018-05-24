import { self } from "react-native-threads";
import { AI } from "rsg-chess";

// listen for messages
self.onmessage = message => {
  const incomingGame = JSON.parse(message);
  const bestMove = AI(
    incomingGame.playAgainstAI.depth,
    {
      board: incomingGame.board,
      turn: JSON.parse(incomingGame.turn),
      threefold: JSON.parse(incomingGame.threefold),
      FEN: incomingGame.FEN
    },
    true
  );

  // send a message, strings only
  self.postMessage(JSON.stringify(bestMove));
};
