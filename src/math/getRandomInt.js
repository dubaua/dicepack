/**
 * Generates a random integer between 1 and given max inclusively
 * @param {number} max max integer
 */

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

export default getRandomInt;
