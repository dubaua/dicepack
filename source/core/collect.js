import Result from '../types/Result.js';
import Detailed from '../types/Detailed.js';
import sum from '../utils/sum.js';
import flatten from '../utils/flatten.js';

const collect = function(rolls, detailed, dice) {
  const result = rolls.reduce(flatten, []).reduce(sum, 0);

  // collecting rolls against dice config
  if (detailed) {
    const _rolls = dice.map((die, index) =>
      rolls[index].map(
        roll =>
          new Result({
            type: die.side === 1 ? 'number' : 'die',
            side: die.side,
            rolled: roll,
          })
      )
    );
    return new Detailed({ result, rolls: _rolls });
  }
  return result;
};

export default collect;
