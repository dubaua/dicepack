import sum from './sum.js';

/**
 * returns average of passed numbers
 * @param {...number} items any numbers
 * @returns {number} one of passed arguments
 */

const getAverage = (...items) => items.reduce(sum) / items.length;

export default getAverage;
