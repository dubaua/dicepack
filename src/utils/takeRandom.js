import getRandomInt from '@/math/getRandomInt.js';

/**
 * Returns a random of passed arguments
 * @param {...*} items any agruments
 * @returns one of passed arguments
 */

const takeRandom = (...items) => items[getRandomInt(items.length) - 1];

export default takeRandom;
