import getRandomInt from '@/math/getRandomInt.js';
import randomizeDie from '@/utils/randomizeDie.js';

/**
 * How to generate dice notation
 * @typedef {Object} requiredArguments
 * @property {number} maxCount - max count of dice set
 * @property {Array<number>} sides - preferable array of sides
 * @property {number} maxLength - count of dice sets
 */

/**
 * Generates a dice notation with desired restrictions
 * @param {...requiredArguments} config - confuguration object
 * @returns {string} notation
 */

function randomizeDiceNotation({ maxCount, sides, maxLength }) {
  const length = getRandomInt(maxLength);
  const notation = [];
  for (let i = 0; i < length; i++) {
    notation.push(randomizeDie({ maxCount, sides }));
  }
  return notation.join('+').replace(/\+\-/g, '-');
}

export default randomizeDiceNotation;
