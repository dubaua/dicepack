/**
 * Checks if given array of numbers sorted descending
 * @param {Array<number>} array array of numbers
 * @returns {boolean}
 */

function isArraySorted(array) {
  return array.every((current, index, source) => index === 0 || source[index - 1] > current);
}

export default isArraySorted;
