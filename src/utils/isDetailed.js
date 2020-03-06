import '@/core/typedef.js';
import isInteger from '@/utils/isInteger.js';
import isResult from '@/utils/isResult.js';

/**
 * Check if given detailed result is valid
 *
 * @param {Detailed} detailed
 * @returns
 */

function isDetailed({ result, rolls }) {
  return isInteger(result) && Array.isArray(rolls) && rolls.every(roll => Array.isArray(roll) && roll.every(isResult));
}

export default isDetailed;
