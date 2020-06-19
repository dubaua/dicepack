import '@/core/typedef.js';
import castToInt from '@/utils/castToInt.js';
import DICE_REGEXP from '@/core/diceRegexp.js';

const STARTING_D_WIHTOUT_COUNT = /^(-?)d/;

/**
 * Transforms single dice notation to Dice object
 * @param {string} notation
 * @returns {Dice} count and side
 */

function getDice(notation) {
  if (typeof notation !== 'string' || !DICE_REGEXP.test(notation)) {
    throw new Error(`Given string ${notation} doesn't match given regular expression ${DICE_REGEXP}`);
  }

  const [count = 1, side = 1] = notation
    .replace(STARTING_D_WIHTOUT_COUNT, '$11d') // restore dropped 1d with sign
    .split('d')
    .map(castToInt);
  return { count, side };
}

export default getDice;
