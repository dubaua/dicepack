import '@/core/typedef.js';
import isInteger from '@/utils/isInteger.js';

/**
 * Check if given result is valid
 * @param {Result} result
 * @returns
 */

function isResult({ side, rolled }) {
  return isInteger(side) && side >= 0 && rolled.every(isInteger);
}

export default isResult;
