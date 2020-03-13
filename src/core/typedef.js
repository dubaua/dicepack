/**
 * How much throw n-sided dice
 * @typedef {Object} Dice
 * @property {number} count - count of rolls
 * @property {number} side - range of random
 */

/**
 * Sum and roll results for n-sided dice
 * @typedef {Object} Result
 * @property {number} side non negative integer
 * @property {Array<number>} rolled an integer
 */

/**
 * Sum and each roll results for each n-sided dice group
 * @typedef {Object} Detailed
 * @property {number} total sum of all roll results
 * @property {Array<Result>} results array of rolls results
 */

/**
 * A chance for getting result
 * @typedef {Object} Point
 * @property {number} result an integer
 * @property {number} chance a number between 0 and 1
 */
