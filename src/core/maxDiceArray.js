import '@/core/typedef.js';
import collectDiceArray from '@/utils/collectDiceArray.js';

/**
 * Calculates maximum possible result
 *
 * @param {Array<Dice>} diceArray
 * @returns {number}
 */

const maxDiceArray = diceArray => collectDiceArray(diceArray.map(({ count, side }) => Math.max(count, count * side)));

export default maxDiceArray;
