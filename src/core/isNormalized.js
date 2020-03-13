import toDiceArray from '@/core/toDiceArray.js';
import sorted from '@/utils/sorted.js';
import unique from '@/utils/unique.js';

/*
 * [A-Z]+       captures uppercase
 * \s           captures spaces
 * d1(\D+|$)    captures d1 d0
 * (\D+|^)1d\d+ captures 1dN 0dN
 * -(\d*)d      captures negative dice
 */

const NOT_NORMALIZED_REGEXP = /[A-Z]+|\s|d1(\D+|$)|(\D+|^)1d\d+|-(\d*)d/;

function isDiceGroupedAndSorted(notation) {
  const sideArray = toDiceArray(notation).map(die => die.side);
  const isUnique = sideArray.reduce(unique, []).length === sideArray.length;
  const isSorted = sideArray.every(sorted);
  return isUnique && isSorted;
}

/**
 * Checks if given notation string is normalized.
 * Normalized dice notation have sorted in descending side order, positive count,
 * lowercased, no spaces, no 1dN, no flat dice such as d0, d1, 0dN
 * @param {string} notation
 * @returns {boolean}
 */

function isNormalized(notation) {
  return !NOT_NORMALIZED_REGEXP.test(notation) && isDiceGroupedAndSorted(notation);
}

export default isNormalized;
