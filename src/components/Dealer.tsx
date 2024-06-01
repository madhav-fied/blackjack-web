import { useEffect, useReducer } from 'react';
import blackjackReducer from './blackjackReducer';
import Hand from './Hand';
import { canDealerCanStillPlay } from '../utils/gameUtils';

interface dealerProps {
  dealHand: () => Array<string>;
  drawCard: () => Array<string>;
  dealerTurn: boolean;
}

const getHand = (fn: () => Array<string>): Array<Array<string>> => {
  const initHands = fn();
  return [initHands];
};

function Dealer({ dealHand, drawCard, dealerTurn }: dealerProps) {
  const [dealerHand, dealerHandActionDispatch] = useReducer(
    blackjackReducer,
    dealHand,
    getHand,
  );

  useEffect(() => {
    if (!dealerTurn) return;
    // console.log({dealerHand, playable: canDealerCanStillPlay(dealerHand)});

    // NOTE: while loop is bad to wrap a reducer action dispatch
    // state update and js are pretty weird
    if (canDealerCanStillPlay(dealerHand)) {
      const card = drawCard();
      setTimeout(() => {
        dealerHandActionDispatch({
          type: 'hit',
          payload: card,
          handId: 0,
        });
      }, 1000);
    }
    // Check: adding drawCard() to deps as per lint?
  }, [dealerTurn, dealerHand, drawCard]);

  return (
    <>
      <h3>Dealer:</h3>
      {dealerHand.map((hand) => <Hand cards={hand} isDealer />)}
    </>
  );
}

export default Dealer;
