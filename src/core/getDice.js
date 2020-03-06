import '@/core/typedef.js';
import castToInt from '@/utils/castToInt.js';
import validate from '@/utils/validate.js';

const DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;
const STARTING_D_WIHTOUT_COUNT = /^(-?)d/;

/**
 * Transforms single dice notation to Dice object
 *
 * @param {string} notation
 * @returns {Dice} count and side
 */

function getDice(notation) {
  const [count = 1, side = 1] = validate(notation, DICE_REGEXP)
    .replace(STARTING_D_WIHTOUT_COUNT, '$11d') // restore dropped 1d with sign
    .split('d')
    .map(castToInt);
  return { count, side };
}

export default getDice;
