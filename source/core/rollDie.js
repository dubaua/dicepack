import getRandomInt from '../utils/getRandomInt.js';

const rollDie = function({ count, side }) {
  let results = [];
  if (side === 1) {
    // no need to roll d1
    results.push(count);
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
