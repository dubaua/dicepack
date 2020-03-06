import '@/core/typedef.js';
import getDice from '@/core/getDice.js';
import validate from '@/utils/validate.js';

const NOTATION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;

/**
 * Converts dice notation to array of Dice
 *
 * @param {string} notation
 * @returns {Array<Dice>} array of Dice
 */

const toDiceArray = notation =>
  validate(notation, NOTATION_REGEXP)
    .replace(/-/g, '+-')
    .split('+')
    .filter(string => string !== '')
    .map(getDice);

export default toDiceArray;
