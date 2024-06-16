// TODO

import { useEffect, useState } from 'react';
import { computeValue } from '../utils/gameUtils';
import Card from './Card';

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
      <hr />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {cards.filter((card) => card !== 'stop').map((card: string) => (
          <Card value={card} />
        ))}
        <div> {`>>  ${computeValue(cards).join(' / ')} `}</div>
      </div>
      {!isDealer
        && (lost ? (
          <h3>Busted</h3>
        ) : (
          <>
            <button onClick={handleHit}>Hit</button>
            <button onClick={handleStay}>Stay</button>
            <button onClick={handleDouble}>Double</button>
            <button onClick={handleSplit}>Split</button>
          </>
        ))}
        <hr />
    </>
  );
}

export default Hand;
