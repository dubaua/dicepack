/**
 * Tries parse string to integer, returns zero if failed
 * @param {string} string a string represening number
 * @returns {number} an integer or zero
 */

const castToInt = string => parseInt(string, 10) || 0;

export default castToInt;
