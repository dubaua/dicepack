import '@/core/typedef.js';
import sum from '@/utils/sum.js';

/**
 * Calculates minimum possible result
 *
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {number} minimum possible result
 */

const minDiceArray = diceArray => diceArray.map(({ count, side }) => Math.min(count, count * side)).reduce(sum, 0);

export default minDiceArray;
