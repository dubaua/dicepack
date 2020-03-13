import '@/core/typedef.js';
import isInteger from '@/utils/isInteger.js';

/**
 * Check if given dice is valid
 * @param {Dice} dice
 * @returns {boolean}
 */

function isDice({ count, side }) {
  return isInteger(count) && isInteger(side) && side >= 0;
}

export default isDice;
