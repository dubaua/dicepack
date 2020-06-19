import '@/core/typedef.js';
import sumArray from '@/math/sumArray.js';

/**
 * Calculates minimum possible result
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {number} minimum possible result
 */

function minDiceArray(diceArray) {
  return sumArray(diceArray.map(({ count, side }) => Math.min(count, count * side)));
}

export default minDiceArray;
