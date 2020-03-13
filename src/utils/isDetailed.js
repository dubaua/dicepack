import '@/core/typedef.js';
import isInteger from '@/utils/isInteger.js';
import isResult from '@/utils/isResult.js';

/**
 * Check if given detailed result is valid
 * @param {Detailed} detailed
 * @returns
 */

function isDetailed({ total, results }) {
  return isInteger(total) && Array.isArray(results) && results.every(isResult);
}

export default isDetailed;
