// Improve this and fix ts
import {Clubs} from '../assets/cards/clubs/';
import {Diamonds} from '../assets/cards/diamonds';
import {Hearts} from '../assets/cards/hearts';
import {Spades} from '../assets/cards/spades';

interface CardProps {
  value: string;
}

function cardMap(card: string) {
  const value = card.split(' ')[0];
  const house = card.split(' ')[1];
  // Note: ratio of card dimension  7 : 5
  switch (house) {
    case '♥': return <img style={{maxHeight: '210px', maxWidth: '150px'}} src={Hearts[`Heart${value}`]} />;
    case '♦': return <img style={{maxHeight: '210px', maxWidth: '150px'}} src={Diamonds[`Diamond${value}`]} />;
    case '♣': return <img style={{maxHeight: '210px', maxWidth: '150px'}} src={Clubs[`Club${value}`]} />;
    case '♠': return <img style={{maxHeight: '210px', maxWidth: '150px'}} src={Spades[`Spade${value}`]} />;
  }
}

function Card({ value }: CardProps) {
  return (
    <div>
      {
        cardMap(value)
      }
    </div>);
}

export default Card;
