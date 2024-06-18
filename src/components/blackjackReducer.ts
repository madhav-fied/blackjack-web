import {
  getMaxValidTotal, isSplittable, stayActionDone,
} from '../utils/gameUtils';

export interface handAction {
  type: 'hit' | 'stay' | 'double' | 'split' | 'reset';
  payload?: Array<string>;
  handId: number;
}

// TODO: Refactor this later
export const blackjackReducer = (hands: Array<Array<string>>, action: handAction) => {
  if (stayActionDone(hands[action.handId]) && action.type !== 'reset') return hands;

  // if total is 21 stop processing actions
  if (getMaxValidTotal(hands[action.handId]) === 21) return hands;

  const newCards = action.payload;

  switch (action.type) {
    case 'hit': {
      // @ts-expect-error https://stackoverflow.com/questions/50234481/typescript-2-8-3-type-must-have-a-symbol-iterator-method-that-returns-an-iterato
      return hands.map((hand, idx) => (idx === action.handId ? [...hand, ...newCards] : hand));
    }
    case 'stay': {
      return hands.map((hand, idx) => (idx === action.handId ? [...hand, 'stop'] : hand));
    }
    case 'double': {
      return hands.map((hand, idx) => (idx === action.handId ? [...hand, ...newCards, 'stop'] : hand));
    }
    case 'split': {
      const handToSplit = hands[action.handId];
      // check if it is splittable else do nothing
      if (!isSplittable(handToSplit)) return hands;

      if (!newCards) throw new Error('Yo bro please draw cards');

      const splitHand = [
        [handToSplit[0], newCards[0]],
        [handToSplit[1], newCards[1]],
      ];

      const newHands = hands
        .filter((_, idx) => idx !== action.handId)
        .concat(splitHand);
      return newHands;
    }
    // TODO: Improve reset: having two forms of reset is bad as of now.
    // One is for dealer, one is for player. Fix type errors too.
    case 'reset': {
      if (!newCards) throw new Error('Yo bro please pass new Cards');
      return [newCards];
    }
    default:
      throw new Error('Yo, give proper operation');
  }
};
