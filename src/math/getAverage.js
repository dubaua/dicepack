import sumArray from '@/math/sumArray.js';

/**
 * returns average of passed numbers
 * @param {...number} items any numbers
 * @returns {number} one of passed arguments
 */

const getAverage = (...items) => sumArray(items.slice()) / items.length;

export default getAverage;
