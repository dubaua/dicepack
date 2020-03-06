import '@/core/typedef.js';
import collectDiceArray from '@/utils/collectDiceArray.js';

/**
 * Calculates minimum possible result
 *
 * @param {Array<Dice>} diceArray
 * @returns {number}
 */

const minDiceArray = diceArray => collectDiceArray(diceArray.map(({ count, side }) => Math.min(count, count * side)));

export default minDiceArray;
