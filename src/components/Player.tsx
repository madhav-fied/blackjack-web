import { useEffect, useReducer } from 'react';
import Hand from './Hand';
import blackjackReducer from './blackjackReducer';
import { canPlayerCanStillPlay } from '../utils/gameUtils';

interface playerProps {
  dealHand: () => Array<string>;
  drawCard: () => Array<string>;
  setDealerTurn: (x: boolean) => void;
}

const getHand = (fn: () => Array<string>): Array<Array<string>> => {
  const initHands = fn();
  return [initHands];
};

function Player({ dealHand, drawCard, setDealerTurn }: playerProps) {
  const [playerHand, playerHandActionDispatch] = useReducer(
    blackjackReducer,
    dealHand,
    getHand,
  );

  function handleHit(handId: number) {
    const card = drawCard();
    playerHandActionDispatch({
      type: 'hit',
      payload: card,
      handId,
    });
  }
  function handleStay(handId: number) {
    playerHandActionDispatch({
      type: 'stay',
      handId,
    });
  }
  function handleDouble(handId: number) {
    const card = drawCard();
    playerHandActionDispatch({
      type: 'double',
      payload: card,
      handId,
    });
  }
  function handleSplit(handId: number) {
    // TODO: Why not drawCard() and drawCard() to get two cards for split
    // both gives same output, should we not queue here. Once done do
    // analyze the side effects too andd it should not affect the future
    const cards = dealHand();
    playerHandActionDispatch({
      type: 'split',
      payload: cards,
      handId,
    });
  }

  // imporve this
  function handleReset(handId: number) {
    const cards = dealHand();
    playerHandActionDispatch({
      type: 'reset',
      payload: cards,
      handId,
    });
  }

  useEffect(() => {
    if (!canPlayerCanStillPlay(playerHand)) setDealerTurn(true);
  }, [playerHand]);

  return (
    <>
      <h3>Player:</h3>
      <button onClick={() => handleReset(0)}>Reset</button>
      {playerHand.map((hand, idx) => (
        <Hand
          cards={hand}
          handleHit={() => handleHit(idx)}
          handleDouble={() => handleDouble(idx)}
          handleStay={() => handleStay(idx)}
          handleSplit={() => handleSplit(idx)}
        />
      ))}
    </>
  );
}

export default Player;
