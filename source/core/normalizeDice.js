import Dice from '../types/Dice.js';
import validateDiceArray from '../utils/validateDiceArray.js';

const normalizeDice = dice =>
  validateDiceArray(dice)
    // turn dice multiplier positive and balance with negative modifier
    .reduce((accumulator, { count, side }) => {
      if (side !== 1 && count < 0) {
        accumulator.push(new Dice({ count: Math.abs(count), side }));
        accumulator.push(new Dice({ count: count * (side + 1), side: 1 }));
      } else {
        accumulator.push(new Dice({ count, side }));
      }
      return accumulator;
    }, [])
    // sort dice by side descendning
    .sort((a, b) => b.side - a.side)
    // group same sided dice
    .reduce((accumulator, { count, side }) => {
      const prevDie = accumulator[accumulator.length - 1];
      if (prevDie && side === prevDie.side) {
        accumulator[accumulator.length - 1] = new Dice({
          side,
          count: prevDie.count + count,
        });
      } else {
        accumulator.push(new Dice({ count, side }));
      }
      return accumulator;
    }, [])
    // drop zero modifier
    .filter(({ count, side }) => !(count === 0 && side === 1));

export default normalizeDice;
