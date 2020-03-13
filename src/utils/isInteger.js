/**
 * Check if given number is integer
 * @param {number} number
 * @returns {boolean}
 */

function isInteger(number) {
  return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
}

export default isInteger;
