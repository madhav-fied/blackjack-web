// TODO

import { useEffect, useState } from 'react';
import { computeValue } from '../utils/gameUtils';

interface handProps {
  cards: Array<string>;
  isDealer?: boolean;
  handleHit?: () => void;
  handleStay?: () => void;
  handleDouble?: () => void;
  handleSplit?: () => void;
}

function Hand({
  isDealer = false,
  cards,
  handleHit,
  handleStay,
  handleDouble,
  handleSplit,
}: handProps) {
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const values = computeValue(cards);
    setLost(Math.min(...values) > 21);
  }, [cards]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {cards.map((card: string) => (
          <div> {card} </div>
        ))}
      </div>
      {!isDealer
        && (lost ? (
          <h3>You lost</h3>
        ) : (
          <>
            <button onClick={handleHit}>Hit</button>
            <button onClick={handleStay}>Stay</button>
            <button onClick={handleDouble}>Double</button>
            <button onClick={handleSplit}>Split</button>
          </>
        ))}
    </>
  );
}

export default Hand;
