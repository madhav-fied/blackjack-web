import {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import Player from '../components/Player';
import Dealer from '../components/Dealer';
import { blackjackReducer } from '../components/blackjackReducer';
import useDeck from '../hooks/useDeck';
import { checkIfBusted, getMaxValidTotal } from '../utils/gameUtils';

type agents = 'player' | 'dealer' | 'game';

const getHand = (fn: () => Array<string>): Array<Array<string>> => {
  const initHands = fn();
  return [initHands];
};

function Game() {
  const [drawCard, dealCards] = useDeck();
  const [winCount, seWinCount] = useState<number>(0);
  const [gameControl, setGameControl] = useState<agents>('player');

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

  const handleReset = useCallback(() => {
    const newDealerCards = drawCard();
    const newPlayerCards = dealCards();

    dealerHandActionDispatch({
      type: 'reset',
      payload: newDealerCards,
      handId: 0,
    });

    playerHandActionDispatch({
      type: 'reset',
      payload: newPlayerCards,
      handId: 0,
    });

    setGameControl('player');
  }, []);

  useEffect(() => {
    if (gameControl !== 'game') return;
    // TODO: standardize this
    const dealerValue = getMaxValidTotal(dealerHand[0]);
    const timesPlayerWon = playerHand.reduce((accumulator, cards) => {
      if (checkIfBusted(cards)) return accumulator;
      const maxTotal = getMaxValidTotal(cards);
      return accumulator + ((maxTotal > dealerValue) ? 1 : 0);
    }, 0);
    seWinCount((prev) => prev + timesPlayerWon);
  }, [gameControl]);

  return (
    <>
      <h1>{`You won ${winCount} time(s) so far`}</h1>
       {gameControl === 'game'
         ? (<button onClick={handleReset}>Join blackjack</button>)
         : null
      }
      <Dealer
        hand={dealerHand}
        drawCard={drawCard}
        gameControl={gameControl}
        setGameControl={setGameControl}
        dealerHandActionDispatch={dealerHandActionDispatch}
      />
      <Player
        hand={playerHand}
        drawCard={drawCard}
        setGameControl={setGameControl}
        playerHandActionDispatch={playerHandActionDispatch}
      />
    </>
  );
}

export default Game;
