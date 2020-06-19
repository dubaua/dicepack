import '@/core/typedef.js';
import rollDice from '@/core/rollDice.js';
import sumArray from '@/math/sumArray.js';

/**
 * Rolls array of Dice, calculating sum of all rolls and return detailed results
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {Detailed} total sum and results for each dice
 */

function rollDiceArray(diceArray) {
  const results = diceArray.map(rollDice);
  const total = sumArray(results.map(({ rolled }) => sumArray(rolled.slice())));
  return { total, results };
}

export default rollDiceArray;
