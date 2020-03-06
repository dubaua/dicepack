import '@/core/typedef.js';
import validateDiceArray from '@/utils/validateDiceArray.js';

/**
 * Normalizes dice notation have sorted in descending side order, positive count,
 * lowercased, no spaces, no 1dN, no flat dice such as d0, d1, 0dN
 *
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {Array<Dice>} array of Dice
 */

const normalizeDiceArray = diceArray =>
  validateDiceArray(diceArray)
    // turn dice multiplier positive and balance with negative modifier
    .reduce((accumulator, { count, side }) => {
      if (side !== 1 && count < 0) {
        accumulator.push({ count: Math.abs(count), side });
        accumulator.push({ count: count * (side + 1), side: 1 });
      } else {
        accumulator.push({ count, side });
      }
      return accumulator;
    }, [])
    // sort dice by side descendning
    .sort((a, b) => b.side - a.side)
    // group same sided dice
    .reduce((accumulator, { count, side }) => {
      const prevDie = accumulator[accumulator.length - 1];
      if (prevDie && side === prevDie.side) {
        accumulator[accumulator.length - 1] = {
          side,
          count: prevDie.count + count,
        };
      } else {
        accumulator.push({ count, side });
      }
      return accumulator;
    }, [])
    // drop zero modifier
    .filter(({ count, side }) => !(count === 0 && side === 1));

export default normalizeDiceArray;
