import { useRef, useState } from 'react';
import { prepareDeck } from '../utils/gameUtils';
import Player from '../components/Player';

function Game() {
  const deck = useRef(prepareDeck());
  const [topCard, setTopCard] = useState<number>(0);

  // returns top card from the deck
  const drawCard = (): Array<string> => {
    const card = [deck.current[topCard]];
    // queue state update
    setTopCard((prev: number) => prev + 1);
    return card;
  };

  // deals 2 card each for the round
  const dealCards = (): Array<string> => {
    const cards = [deck.current[topCard], deck.current[topCard + 1]];
    // queue state update
    setTopCard((prev: number) => prev + 2);
    return cards;
  };

  return (
    <>
      <h1>Money</h1>
      <Player dealHand={() => dealCards()} drawCard={drawCard} />
    </>
  );
}

export default Game;
