import getRandomInt from './getRandomInt.js';

const takeRandom = (...items) => items[getRandomInt(items.length) - 1];

export default takeRandom;
