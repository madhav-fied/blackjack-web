import { CARDS } from '../constants/cards';

export const dealRandomCard = () => CARDS[Math.floor(Math.random() * CARDS.length)];

export const shuffleDeck = (
  unshuffledFinalDeck: Array<string>,
): Array<string> => {
  const shuffledFinalDeck = unshuffledFinalDeck
    .map((card) => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => card);

  return shuffledFinalDeck;
};

// shuffle should have slight bias
export const prepareDeck = (decks = 10) => {
  let unshuffledFinalDeck: Array<string> = [];
  for (let i = 0; i < decks; i += 1) {
    unshuffledFinalDeck = [...unshuffledFinalDeck, ...CARDS];
  }

  return shuffleDeck(unshuffledFinalDeck);
};

export const computeValue = (cards: Array<string>): Array<number> => {
  const houseCards = ['J', 'Q', 'K'];

  const hand = cards.reduce(
    (accumulator, card: string) => {
      const faceValue = card === 'stop' ? '0' : card.charAt(0);

      if (houseCards.includes(faceValue)) accumulator.value += 10;
      else if (faceValue === 'A') accumulator.aces += 1;
      else accumulator.value += Number(faceValue);

      return accumulator;
    },
    {
      value: 0,
      aces: 0,
    },
  );

  if (hand.aces !== 0) {
    // what the hell I am writing :(
    return [hand.aces > 1 ? 11 + hand.aces - 1 : 11, hand.aces].map(
      (withAce) => hand.value + withAce,
    );
  }

  return [hand.value];
};
