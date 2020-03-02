import takeRandom from './takeRandom.js';
import getRandomInt from './getRandomInt.js';

const randomizeDie = function({ maxCount, sides }) {
  const dice = {
    count: takeRandom(1, -1) * getRandomInt(maxCount),
    side: takeRandom(...sides),
  };

  // sometime drop d1
  const side = dice.side === 1 ? takeRandom('d1', '') : `d${dice.side}`;
  // drop count sometimes if side not dropped and count = 1
  const count = side !== '' && dice.count === 1 ? takeRandom(dice.count, '') : dice.count;

  return `${count}${side}`;
};

export default randomizeDie;
