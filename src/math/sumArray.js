/**
 * Return sum of passed number array
 * function taken from array summation peformance tests https://jsperf.com/array-summation/25
 * @param {Array<number>} array array of numbers
 * @returns {number} array sum
 */

function sumArray(array) {
  let sum = 0;
  for (let i = array.length; i--; ) {
    sum += array.pop();
  }
  return sum;
}

export default sumArray;
