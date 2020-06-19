/**
 * Checks if difference of passed two numbers is less then epsilon value. Default epsilon is 0.01
 * @param {number} first
 * @param {number} second
 * @param {number} [epsilon=0.01]
 * @returns {boolean}
 */

function approximatelyEquals(first, second, epsilon = 0.01) {
  return Math.abs(first - second) < epsilon;
}

export default approximatelyEquals;
