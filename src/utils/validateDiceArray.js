import '@/core/typedef.js';
import isDice from '@/utils/isDice.js';

/**
 * Passes down valid dice or throws TypeError
 * @param {Array.<Dice>} dice
 * @returns {Array.<Dice>} given dice
 */

function validateDiceArray(dice) {
  if (!dice.every(isDice)) {
    throw new TypeError(`Given dice array ${dice} contains elements differs from Dice.`);
  } else {
    return dice;
  }
}

export default validateDiceArray;
