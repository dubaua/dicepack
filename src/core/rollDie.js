import getRandomInt from '../utils/getRandomInt.js';

const rollDie = function({ count, side }) {
  const results = [];
  // no need to roll d1
  if (side === 1 || side === 0 || count === 0) {
    results.push(count * side);
  } else {
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    for (let i = 0; i < rollCount; i++) {
      results.push(sign * getRandomInt(side));
    }
  }
  return results;
};

export default rollDie;
