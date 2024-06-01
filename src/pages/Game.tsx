import { useReducer, useState } from 'react';
import Player from '../components/Player';
import Dealer from '../components/Dealer';
import { blackjackReducer } from '../components/blackjackReducer';
import useDeck from '../hooks/useDeck';

const getHand = (fn: () => Array<string>): Array<Array<string>> => {
  const initHands = fn();
  return [initHands];
};

function Game() {
  const [drawCard, dealCards] = useDeck();
  const [dealerTurn, setDealerTurn] = useState<boolean>(false);
  const [playerHand, playerHandActionDispatch] = useReducer(
    blackjackReducer,
    dealCards,
    getHand,
  );

  const [dealerHand, dealerHandActionDispatch] = useReducer(
    blackjackReducer,
    drawCard,
    getHand,
  );

  return (
    <>
      <h1>Money</h1>
      <h2>isDealerTurn: {dealerTurn ? 'YES' : 'NO'}</h2>
      <Dealer
        hand={dealerHand}
        drawCard={drawCard}
        dealerTurn={dealerTurn}
        dealerHandActionDispatch={dealerHandActionDispatch}
      />
      <Player
        hand={playerHand}
        drawCard={drawCard}
        setDealerTurn={setDealerTurn}
        playerHandActionDispatch={playerHandActionDispatch}
      />
    </>
  );
}

export default Game;
