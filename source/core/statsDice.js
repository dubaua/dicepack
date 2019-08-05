import Stats from '../types/Stats.js';
import { sum, directProduct } from '../utils.js';

export default function statsDice(dice) {
  const independent = dice.reduce(function(accumulator, { count, side }) {
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    if (side === 1) {
      accumulator.push([count]);
    } else {
      let dieProbabilities = [];
      for (let result = 1; result <= side; result++) {
        dieProbabilities.push(sign * result);
      }
      for (let die = 0; die < rollCount; die++) {
        accumulator.push(dieProbabilities);
      }
    }
    return accumulator;
  }, []);

  const combined = independent.reduce(directProduct, [0]);

  const count = combined.length;

  const chance = 1 / count;

  const compact = combined
    .map(result => ({ chance, result }))
    .reduce((groups, { result, chance }) => {
      const key = String(result);
      if (!groups[key]) {
        groups[key] = { result, chance };
      } else {
        groups[key].chance += chance;
      }
      return groups;
    }, {});

  const distribution = Object.values(compact).sort((a, b) => a.result - b.result);

  const average = combined.reduce(sum, 0) / count;

  const variance = combined.map(result => Math.pow(result - average, 2)).reduce(sum, 0) / count;

  const standardDeviation = Math.sqrt(variance);

  return new Stats({ distribution, average, variance, standardDeviation });
}
