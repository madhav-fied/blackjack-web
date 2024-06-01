import { useEffect } from 'react';
import Hand from './Hand';
import { canPlayerStillPlay } from '../utils/gameUtils';
import { handAction } from './blackjackReducer';

interface playerProps {
  hand: Array<Array<string>>;
  drawCard: () => Array<string>
  setGameControl: (x: 'player' | 'dealer' | 'game') => void;
  playerHandActionDispatch: (x: handAction) => void;
}

function Player({
  hand, drawCard, setGameControl, playerHandActionDispatch,
}: playerProps) {
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
    // Changing it to drawCard as now its using a ref => no repeated cards
    const cards = [...drawCard(), ...drawCard()];
    playerHandActionDispatch({
      type: 'split',
      payload: cards,
      handId,
    });
  }

  useEffect(() => {
    // console.log({playerHand, playable: canPlayerCanStillPlay(playerHand)})
    if (!canPlayerStillPlay(hand)) setGameControl('dealer');
    // Check: adding setDealerTurn() to deps as per lint
  }, [hand, setGameControl]);

  return (
    <>
      <h3>Player:</h3>
      {hand.map((cards, idx) => (
        <Hand
          cards={cards}
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
