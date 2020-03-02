import Result from '../types/Result.js';
import Detailed from '../types/Detailed.js';
import sum from './sum.js';
import flatten from './flatten.js';

const collect = function(results, detailed, dice) {
  const result = results.reduce(flatten, []).reduce(sum, 0);

  // collecting rolls against dice config
  if (detailed) {
    const rolls = dice.map(({ side }, index) => results[index].map(roll => new Result({ side, roll })));
    return new Detailed({ result, rolls });
  }
  return result;
};

export default collect;
