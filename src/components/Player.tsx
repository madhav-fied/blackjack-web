import { useReducer } from 'react';
import Hand from './Hand';
import { isSplittable } from '../utils/gameUtils';

interface handProps {
  dealHand: () => Array<string>;
  drawCard: () => Array<string>;
}

interface handAction {
  type: 'hit' | 'stay' | 'double' | 'split' | 'reset';
  payload?: Array<string>;
  handId: number;
}

const handReducer = (hands: Array<Array<string>>, action: handAction) => {
  // TODO: stop condition;

  const newCards = action.payload;

  switch (action.type) {
    case 'hit': {
      // @ts-expect-error https://stackoverflow.com/questions/50234481/typescript-2-8-3-type-must-have-a-symbol-iterator-method-that-returns-an-iterato
      return hands.map((hand, idx) => (idx === action.handId ? [...hand, ...newCards] : hand));
    }
    case 'stay': {
      return hands.map((hand, idx) => (idx === action.handId ? [...hand, 'stop'] : hand));
    }
    case 'double': {
      return hands.map((hand, idx) => (idx === action.handId ? [...hand, ...newCards, 'stop'] : hand));
    }
    case 'split': {
      const handToSplit = hands[action.handId];
      // check if it is splittable else do nothing
      if (!isSplittable(handToSplit)) return hands;

      if (!newCards) throw new Error('Yo bro please draw cards');

      const splitHand = [
        [handToSplit[0], newCards[0]],
        [handToSplit[1], newCards[1]],
      ];

      const newHands = hands
        .filter((_, idx) => idx !== action.handId)
        .concat(splitHand);
      return newHands;
    }
    case 'reset': {
      return [[...newCards]];
    }
    default:
      throw new Error('Yo, give proper operation');
  }
};

const getHand = (fn: () => Array<string>): Array<Array<string>> => {
  const initHands = fn();
  return [initHands];
};

function Player({ dealHand, drawCard }: handProps) {
  const [playerHand, playerHandActionDispatch] = useReducer(
    handReducer,
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

  return (
    <>
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
