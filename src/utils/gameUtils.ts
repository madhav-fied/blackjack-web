import { CARDS, WINNING_SCORE } from '../constants/cards';

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
      const faceValue = card === 'stop' ? '0' : card.split(' ')[0];

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

export const isBlackJack = (hand: Array<string>): boolean => {
  const maxScore = Math.max(...computeValue(hand));
  if (maxScore === WINNING_SCORE && hand.length === 2) return true;
  return false;
};

export const isSplittable = (hand: Array<string>): boolean => {
  if (hand.length === 2 && hand[0].split(' ')[0] === hand[1].split(' ')[0]) return true;
  return false;
};

export const stayActionDone = (hand: Array<string>): boolean => {
  if (hand[hand.length - 1] === 'stop') return true;
  return false;
};

export const checkIfBusted = (hand: Array<string>, valueLimit: number = 21) => {
  const deckValue = computeValue(hand);
  return Math.min(...deckValue) > valueLimit;
};

export const canPlayerStillPlay = (hands: Array<Array<string>>): boolean => {
  // 21 leaves the player with no actions as it is a winning state
  const valueLimit = 20;
  return hands.reduce((accumulator, hand) => {
    if (hand[hand.length - 1] === 'stop' || isBlackJack(hand)) return false;
    const isBusted = checkIfBusted(hand, valueLimit);
    return accumulator || !isBusted;
  }, false);
};

export const getMaxValidTotal = (hand: Array<string>): number => {
  const valuesPossible = computeValue(hand);
  // adding -1 to ensure we have a bust
  return Math.max(...valuesPossible.filter((value) => value < 22), -1);
};

export const canDealerStillPlay = (hands: Array<Array<string>>): boolean => {
  // Improve this? Maybe give user the option to choose
  // dealer should hit on all 16s and stop on any 17s
  const valueLimit = 17;
  return hands.reduce((accumulator, hand) => {
    const shouldHit = !checkIfBusted(hand, valueLimit);
    return accumulator || shouldHit;
  }, false);
};

// eslint-disable-next-line max-len
export const IsPlayerHandBetter = (playerCards: Array<string>, dealerCards: Array<string>): boolean => {
  if (isBlackJack(playerCards)) return true;

  const dealerValue = getMaxValidTotal(dealerCards);
  const playerValue = getMaxValidTotal(playerCards);

  if (playerValue > dealerValue) return true;

  return false;
};
