import sum from '@/utils/sum.js';
import flatten from '@/utils/flatten.js';

const collectDiceArray = function(results, detailed, dice) {
  const result = results.reduce(flatten, []).reduce(sum, 0);

  // collecting rolls against dice config
  if (detailed) {
    const rolls = dice.map(({ side }, index) => results[index].map(roll => ({ side, roll })));
    return { result, rolls };
  }
  return result;
};

export default collectDiceArray;
