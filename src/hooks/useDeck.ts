import { useRef } from 'react';
import { prepareDeck } from '../utils/gameUtils';

const useDeck = () => {
  const deck = useRef(prepareDeck());
  const topCardIdx = useRef(0);

  // returns top card from the deck
  const drawCard = (): Array<string> => {
    const card = [deck.current[topCardIdx.current]];
    // queue state update
    // decieded to go with ref here
    topCardIdx.current += 1;
    return card;
  };

  // deals 2 card each for the round
  const dealCards = (): Array<string> => {
    const cards = [
      deck.current[topCardIdx.current],
      deck.current[topCardIdx.current + 1],
    ];
    topCardIdx.current += 2;
    return cards;
  };
  return [drawCard, dealCards];
};

export default useDeck;
