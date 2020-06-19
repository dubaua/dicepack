import normalizeDiceArray from '@/core/normalizeDiceArray.js';
import splitArrayByFilter from '@/utils/splitArrayByFilter.js';
import minDiceArray from '@/core/minDiceArray.js';
import maxDiceArray from '@/core/maxDiceArray.js';

/**
 * Calclulates chance for each result
 * @param {Array<Dice>} diceArray array of Dice
 * @returns {Object.<string, number>} hashmap with result keys and chance values
 */

function distributeDiceArray(diceArray) {
  // for better performance I normalize dice array to turn all dice positive
  const normalizedDiceArray = normalizeDiceArray(diceArray);

  // split to dice array and modifiers
  const [_diceArray, modifierArray] = splitArrayByFilter(normalizedDiceArray, dice => dice.side !== 1);

  // extract modifier
  const modifier = modifierArray.length ? modifierArray[0].count : 0;

  // filling up range array
  // range array is maximum of each separate dice
  // as long as they are normalized
  const rangeArray = [];
  if (_diceArray.length) {
    for (let i = 0; i < _diceArray.length; i++) {
      const { count, side } = _diceArray[i];
      for (let j = 0; j < count; j++) {
        rangeArray.push(side);
      }
    }
  }

  const orderArray = [];
  for (let i = 0; i < rangeArray.length; i++) {
    orderArray.push(i === 0 ? 1 : rangeArray[i - 1] * orderArray[i - 1]);
  }

  const complexicity = rangeArray.reduce((a, r) => a * r, 1);
  const chance = 1 / complexicity;

  const probabilities = [];
  for (let i = 0; i < complexicity; i++) {
    let result = modifier;
    for (let j = 0; j < rangeArray.length; j++) {
      result += (Math.floor(i / orderArray[j]) % rangeArray[j]) + 1;
    }
    probabilities.push(result);
  }

  const min = minDiceArray(normalizedDiceArray);
  const max = maxDiceArray(normalizedDiceArray);

  // creating distribution hashmap
  const distribution = {};
  for (let i = min; i <= max; i++) {
    distribution[i] = 0;
  }

  // filling up distribution hashmap
  for (let i = 0; i < probabilities.length; i++) {
    distribution[probabilities[i]] += chance;
  }

  return distribution;
}

export default distributeDiceArray;
