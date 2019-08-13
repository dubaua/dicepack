import normalizeDice from './normalizeDice.js';
import directProduct from '../utils/directProduct.js';

export default function distributeDice(dice) {
  const normalized = normalizeDice(dice);

  const diceToCalc = normalized.filter(die => die.side !== 1);
  const modifierDie = normalized.filter(die => die.side === 1);
  const modifier = modifierDie.length ? modifierDie[0].count : 0;

  const probabilities = diceToCalc.reduce((accumulator, { count, side }) => {
    let dieProbabilities = [];
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
      if (!distribution[resultKey]) {
        distribution[resultKey] = { result, chance };
      } else {
        distribution[resultKey].chance += chance;
      }
      return distribution;
    }, {});

  return Object.values(compact).sort((a, b) => a.result - b.result);
}
