import takeRandom from '@/utils/takeRandom.js';
import getRandomInt from '@/math/getRandomInt.js';

/**
 * How to generate die notation
 * @typedef {Object} requiredArguments
 * @property {number} maxCount - max count of dice set
 * @property {Array<number>} sides - preferable array of sides
 */

/**
 * Generates a die notation with desired restrictions
 * @param {...requiredArguments} config - confuguration object
 * @returns {string} notation
 */

function randomizeDie({ maxCount, sides }) {
  const dice = {
    count: takeRandom(1, -1) * getRandomInt(maxCount),
    side: takeRandom(...sides),
  };

  // sometime drop d1
  const side = dice.side === 1 ? takeRandom('d1', '') : `d${dice.side}`;
  // drop count sometimes if side not dropped and count = 1
  const count = side !== '' && dice.count === 1 ? takeRandom(dice.count, '') : dice.count;

  return `${count}${side}`;
}

export default randomizeDie;
