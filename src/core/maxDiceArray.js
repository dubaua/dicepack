import '@/core/typedef.js';
import sum from '@/utils/sum.js';

/**
 * Calculates maximum possible result
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {number} maximum possible result
 */

function maxDiceArray(diceArray) {
  return diceArray.map(({ count, side }) => Math.max(count, count * side)).reduce(sum, 0);
}

export default maxDiceArray;
