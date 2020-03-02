import normalizeDice from './normalizeDice.js';
import Point from '../types/Point.js';
import directProduct from '../utils/directProduct.js';

export default function distributeDice(dice) {
  let distribution = [];
  const normalized = normalizeDice(dice);

  // modifiy zeroes
  const onlyDice = [];
  const modifiers = [];
  normalized.forEach(die => {
    if (die.side === 1 || die.side === 0) {
      modifiers.push(die);
    } else {
      onlyDice.push(die);
    }
  });

  const modifier = modifiers.length ? modifiers[0].count * modifiers[0].side : 0;

  if (onlyDice.length) {
    const probabilities = onlyDice.reduce((accumulator, { count, side }) => {
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
        const nextPoint = new Point({
          result,
          chance: chance + (distribution[resultKey] ? distribution[resultKey].chance : 0),
        });
        distribution[resultKey] = nextPoint;
        return distribution;
      }, {});

    distribution = Object.values(compact).sort((a, b) => a.result - b.result);
  } else {
    distribution = [new Point({ result: modifier, chance: 1 })];
  }

  return distribution;
}
