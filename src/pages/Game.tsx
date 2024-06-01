import { useRef, useState } from 'react';
import { prepareDeck } from '../utils/gameUtils';
import Player from '../components/Player';
import Dealer from '../components/Dealer';

function Game() {
  const deck = useRef(prepareDeck());
  const topCardIdx = useRef(0);
  const [dealerTurn, setDealerTurn] = useState<boolean>(false);
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

  return (
    <>
      <h1>Money</h1>
      <h2>isDealerTurn: {dealerTurn ? 'YES' : 'NO'}</h2>
      <Dealer
        dealHand={() => drawCard()}
        drawCard={drawCard}
        dealerTurn={dealerTurn}
      />
      <Player
        dealHand={() => dealCards()}
        drawCard={drawCard}
        setDealerTurn={setDealerTurn}
      />
    </>
  );
}

export default Game;
