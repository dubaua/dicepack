import '@/core/typedef.js';

/**
 * calculates count of possible roll result combinations
 * @param {Array<Dice>} diceArray
 * @returns {number} count of combinations
 */

function getDiceArrayComplexity(diceArray) {
  return diceArray.reduce((complexity, { count, side }) => complexity * Math.pow(side, Math.abs(count)), 1);
}

export default getDiceArrayComplexity;
