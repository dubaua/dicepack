import '@/core/typedef.js';
import getRandomInt from '@/math/getRandomInt.js';

/**
 * Rolls diven dice and return rolls array and side as Result
 * @param {Dice} dice count and side
 * @returns {Result} side and rolled array
 */

function rollDice({ count, side }) {
  const rolled = [];
  // no need to roll d1, d0, 0dN
  if (side === 1 || side === 0 || count === 0) {
    rolled.push(count * side);
  } else {
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    for (let i = 0; i < rollCount; i++) {
      rolled.push(sign * getRandomInt(side));
    }
  }
  return { side, rolled };
}

export default rollDice;
