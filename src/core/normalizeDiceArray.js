import '@/core/typedef.js';
import validateDiceArray from '@/utils/validateDiceArray.js';

/**
 * Turns negative dice count to positive dice and negative modifier,
 * sorts dice descending by side,
 * groups same sided dice,
 * sums all modifiers, drops zero dice
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {Array<Dice>} normalized array of Dice
 */

function normalizeDiceArray(diceArray) {
  return (
    validateDiceArray(diceArray)
      // Turns negative dice count to positive dice and negative modifier
      .reduce((accumulator, { count, side }) => {
        if (side !== 1 && count < 0) {
          accumulator.push({ count: Math.abs(count), side });
          accumulator.push({ count: count * (side + 1), side: 1 });
        } else {
          accumulator.push({ count, side });
        }
        return accumulator;
      }, [])
      // sorts dice descending by side
      .sort((a, b) => b.side - a.side)
      // groups same sided dice
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
      // drops zero dice
      .filter(({ count, side }) => count !== 0 && side !== 0)
  );
}

export default normalizeDiceArray;
