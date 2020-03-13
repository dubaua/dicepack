import '@/core/typedef.js';
import rollDice from '@/core/rollDice.js';
import sum from '@/utils/sum.js';

/**
 * Rolls array of Dice, calculating sum of all rolls and return detailed results
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {Detailed} total sum and results for each dice
 */

function rollDiceArray(diceArray) {
  const results = diceArray.map(rollDice);
  const total = results.map(({ rolled }) => rolled.reduce(sum, 0)).reduce(sum, 0);
  return { total, results };
}

export default rollDiceArray;
