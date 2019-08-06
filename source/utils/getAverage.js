import sum from './sum.js';

const getAverage = (...items) => items.reduce(sum) / items.length;

export default getAverage;
