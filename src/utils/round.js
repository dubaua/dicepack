import getSign from '@/utils/getSign.js';

/**
 * returns rounded to passed precision number
 * @param {number} number
 * @param {number} [precision=2]
 * @returns {number} rounded number
 */

function round(number, precision = 2) {
  const pow = Math.pow(10, precision);
  return (Math.round(Math.abs(number) * pow) / pow) * getSign(number);
}

export default round;
