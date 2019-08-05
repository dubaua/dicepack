import toDice from './toDice.js';
import { unique, sorted } from '../utils.js';

/*
 * [A-Z]+       captures uppercase
 * \s           captures spaces
 * d1(\D+|$)    captures d1
 * (\D+|^)1d\d+ captures 1dN
 * -(\d*)d      captures negative dice
 */
const NOT_NORMALIZED_REGEXP = /[A-Z]+|\s|d1(\D+|$)|(\D+|^)1d\d+|-(\d*)d/;

function isDiceGroupedAndSorted(notation) {
  const dice = toDice(notation).map(die => die.side);
  const isUnique = dice.reduce(unique, []).length === dice.length;
  const isSorted = dice.every(sorted);
  return isUnique && isSorted;
}

const isNormalized = notation => !NOT_NORMALIZED_REGEXP.test(notation) && isDiceGroupedAndSorted(notation);

// order is crucial
export default isNormalized;
