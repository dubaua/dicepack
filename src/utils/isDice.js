import '@/core/typedef.js';
import isInteger from '@/utils/isInteger.js';

/**
 * Check if given die is valid
 *
 * @param {Dice} dice
 * @returns
 */

function isDice({ count, side }) {
  return isInteger(count) && isInteger(side) && side >= 0;
}

export default isDice;
