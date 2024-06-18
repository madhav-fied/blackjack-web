import { useEffect } from 'react';
import Hand from './Hand';
import { canDealerStillPlay } from '../utils/gameUtils';
import { handAction } from './blackjackReducer';

interface dealerProps {
  hand: Array<Array<string>>;
  drawCard: () => Array<string>;
  gameControl: 'player' | 'dealer' | 'game';
  setGameControl: (x: 'player' | 'dealer' | 'game') => void;
  dealerHandActionDispatch: (x: handAction) => void;
}

function Dealer({
  hand, drawCard, gameControl, setGameControl, dealerHandActionDispatch,
}: dealerProps) {
  useEffect(() => {
    if (gameControl !== 'dealer') return;
    // console.log({ hand, playable: canDealerStillPlay(hand) });

    // NOTE: while loop is bad to wrap a reducer action dispatch
    // state update and js are pretty weird
    if (canDealerStillPlay(hand)) {
      const card = drawCard();
      dealerHandActionDispatch({
        type: 'hit',
        payload: card,
        handId: 0,
      });
    } else setGameControl('game');
    // Check: adding drawCard() and dispatch to deps as per lint?
  }, [gameControl, hand, drawCard, dealerHandActionDispatch, setGameControl]);

  return (
    <>
      <h3>Dealer:</h3>
      {hand.map((cards) => <Hand cards={cards} isDealer />)}
    </>
  );
}

export default Dealer;
