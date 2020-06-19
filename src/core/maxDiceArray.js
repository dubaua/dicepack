import '@/core/typedef.js';
import sumArray from '@/math/sumArray.js';

/**
 * Calculates maximum possible result
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {number} maximum possible result
 */

function maxDiceArray(diceArray) {
  return sumArray(diceArray.map(({ count, side }) => Math.max(count, count * side)));
}

export default maxDiceArray;
