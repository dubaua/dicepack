import '@/core/typedef.js';
import isDice from '@/utils/isDice.js';

/**
 * Converts dice array to notation
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {string} dice notation
 */

function toNotation(diceArray) {
  if (!diceArray.every(isDice)) {
    throw new TypeError(`Given dice array ${diceArray} contains elements differs from Dice.`);
  }
  return (
    diceArray.reduce(
      (accumulator, { count, side }, index) =>
        `${accumulator}${
          // don't plus at string start
          side !== 0 && count < 0 ? '-' : index > 0 ? '+' : ''
        }${
          // drop 1dN, N!==1
          side === 0 ? '0' : Math.abs(count) === 1 && side !== 1 ? '' : Math.abs(count)
        }${
          // drop dN if d1, d0 or 0dN
          side === 1 || side === 0 || count === 0 ? '' : 'd' + side
        }`,
      '',
    ) || '0' // if empty array passed returns zero string
  );
}

export default toNotation;
