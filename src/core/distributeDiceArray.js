import '@/core/typedef.js';
import normalizeDiceArray from '@/core/normalizeDiceArray.js';
import directProduct from '@/utils/directProduct.js';
import splitArrayByFilter from '@/utils/splitArrayByFilter.js';

/**
 * Calclulates chance for each result
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {Array<Point>} array of result chances
 */

function distributeDiceArray(diceArray) {
  // for performance is better to normalize dice
  const normalizedDiceArray = normalizeDiceArray(diceArray);

  // split to dice array and modifiers
  const [_diceArray, modifierArray] = splitArrayByFilter(normalizedDiceArray, dice => dice.side !== 1);

  // extract modifier
  const modifier = modifierArray.length ? modifierArray[0].count : 0;

  let distribution = [];
  if (_diceArray.length) {
    const probabilities = _diceArray.reduce((accumulator, { count, side }) => {
      const dieProbabilities = [];
      for (let result = 1; result <= side; result++) {
        dieProbabilities.push(result);
      }
      for (let die = 0; die < count; die++) {
        accumulator.push(dieProbabilities);
      }
      return accumulator;
    }, []);

    const combined = directProduct(...probabilities);

    const chance = 1 / combined.length;

    const compact = combined
      .map(result => ({ result: result + modifier, chance }))
      .reduce((distribution, { result, chance }) => {
        const resultKey = String(result);
        const nextPoint = {
          result,
          chance: chance + (distribution[resultKey] ? distribution[resultKey].chance : 0),
        };
        distribution[resultKey] = nextPoint;
        return distribution;
      }, {});

    distribution = Object.values(compact).sort((a, b) => a.result - b.result);
  } else {
    distribution = [{ result: modifier, chance: 1 }];
  }

  return distribution;
}

export default distributeDiceArray;
