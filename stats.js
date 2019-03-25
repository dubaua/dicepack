import { parse } from './index.js';

const sum = (a, c) => a + c;

const directProduct = (accumulator, current) => [].concat(...current.map(x => accumulator.map(y => sum(x, y))));

const diceStats = function(dice) {
  const independent = dice.reduce(function(accumulator, current) {
    const { count, side } = current;
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    if (side === 0 || count === 0) {
      accumulator.push([0]);
    } else if (side === 1) {
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

  const average = combined.reduce(sum, 0) / count;

  const variance = combined.map(result => Math.pow(result - average, 2)).reduce(sum, 0) / count;

  const standardDeviation = Math.sqrt(variance);

  const chance = 1 / count;

  const compact = combined
    .map(result => ({ chance, result }))
    .reduce((groups, current) => {
      const { result, chance } = current;
      const key = String(result);
      if (!groups[key]) {
        groups[key] = { result, chance };
      } else {
        groups[key].chance += chance;
      }
      return groups;
    }, {});

  const distribution = Object.values(compact).sort((a, b) => a.result - b.result);

  return {
    average,
    variance,
    standardDeviation,
    distribution,
  };
};

const stats = (expression) => diceStats(parse(expression));

export { diceStats, stats };
