import { useEffect, useReducer, useState } from 'react';
import { computeValue } from '../utils/gameUtils';

interface handProps {
  dealHand: () => Array<string>;
  drawCard: () => Array<string>;
}

interface handAction {
  type: 'hit' | 'stay' | 'double' | 'split' | 'reset';
  payload?: Array<string>;
}

const handReducer = (hand: Array<string>, action: handAction) => {
  if (hand[hand.length - 1] === 'stop') return hand;

  const newCards = action.payload;

  switch (action.type) {
    case 'hit':
      // @ts-expect-error https://stackoverflow.com/questions/50234481/typescript-2-8-3-type-must-have-a-symbol-iterator-method-that-returns-an-iterato
      return [...hand, ...newCards];
    case 'stay':
      return [...hand, 'stop'];
    case 'double':
      return [...hand, ...newCards, 'stop'];
    case 'split':
      return [...hand, 'split'];
    case 'reset':
      return [...newCards];
    default:
      return [...hand, 'invalid'];
  }
};

const getHand = (fn: () => Array<string>) => fn();

function Hand({ dealHand, drawCard }: handProps) {
  const [playerHand, playerHandActionDispatch] = useReducer(
    handReducer,
    dealHand,
    getHand,
  );
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const values = computeValue(playerHand);
    setLost(Math.min(...values) > 21);
  }, [playerHand]);

  function handleHit() {
    const card = drawCard();
    playerHandActionDispatch({
      type: 'hit',
      payload: card,
    });
  }
  function handleStay() {
    playerHandActionDispatch({
      type: 'stay',
    });
  }
  function handleDouble() {
    const card = drawCard();
    playerHandActionDispatch({
      type: 'double',
      payload: card,
    });
  }
  function handleSplit() {
    playerHandActionDispatch({
      type: 'split',
    });
  }

  function handleReset() {
    const cards = dealHand();
    playerHandActionDispatch({
      type: 'reset',
      payload: cards,
    });
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {playerHand.map((card: string) => (
          <div> {card} </div>
        ))}
      </div>
      {lost ? (
        <h4>Over 21 {lost}</h4>
      ) : (
        <>
          <button onClick={handleHit}>Hit</button>
          <button onClick={handleStay}>Stay</button>
          <button onClick={handleDouble}>Double</button>
          <button onClick={handleSplit}>Split</button>
        </>
      )}
    </>
  );
}

export default Hand;
