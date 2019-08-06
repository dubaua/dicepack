import sum from './sum.js';
import flatten from './flatten.js';

const directProduct = (accumulator, current) => current.map(x => accumulator.map(y => sum(x, y))).reduce(flatten, []);

export default directProduct;
