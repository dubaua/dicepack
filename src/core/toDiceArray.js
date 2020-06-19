import '@/core/typedef.js';
import getDice from '@/core/getDice.js';
import NOTATION_REGEXP from '@/core/notationRegexp.js';

/**
 * Converts dice notation to array of Dice
 * @param {string} notation
 * @returns {Array<Dice>} array of Dice
 */

function toDiceArray(notation) {
  if (typeof notation !== 'string' || !NOTATION_REGEXP.test(notation)) {
    throw new Error(`Given string ${notation} doesn't match given regular expression ${NOTATION_REGEXP}`);
  }
  return notation
    .replace(/-/g, '+-')
    .split('+')
    .filter((string) => string !== '')
    .map(getDice);
}

export default toDiceArray;
