import { useEffect } from 'react';
import Hand from './Hand';
import { canDealerCanStillPlay } from '../utils/gameUtils';
import { handAction } from './blackjackReducer';

interface dealerProps {
  hand: Array<Array<string>>;
  drawCard: () => Array<string>;
  dealerTurn: boolean;
  dealerHandActionDispatch: (x: handAction) => void;
}

function Dealer({
  hand, drawCard, dealerTurn, dealerHandActionDispatch,
}: dealerProps) {
  useEffect(() => {
    if (!dealerTurn) return;
    // console.log({dealerHand, playable: canDealerCanStillPlay(dealerHand)});

    // NOTE: while loop is bad to wrap a reducer action dispatch
    // state update and js are pretty weird
    if (canDealerCanStillPlay(hand)) {
      const card = drawCard();
      setTimeout(() => {
        dealerHandActionDispatch({
          type: 'hit',
          payload: card,
          handId: 0,
        });
      }, 1000);
    }
    // Check: adding drawCard() and dispatch to deps as per lint?
  }, [dealerTurn, hand, drawCard, dealerHandActionDispatch]);

  return (
    <>
      <h3>Dealer:</h3>
      {hand.map((cards) => <Hand cards={cards} isDealer />)}
    </>
  );
}

export default Dealer;
