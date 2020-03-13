import '@/core/typedef.js';
import isInteger from '@/utils/isInteger.js';

/**
 * Check if given point is valid
 * @param {Point} point
 * @returns
 */

function isPoint({ result, chance }) {
  return isInteger(result) && typeof chance === 'number' && 0 <= chance && chance <= 1;
}

export default isPoint;
