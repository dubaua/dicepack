/**
 * Returns number positive or negative 1 or 0
 * @param {number} x
 * @returns {number} 1 | -1 | 0 | -0
 */

function getSign(x) {
  if (typeof x !== 'number') {
    return NaN;
  } else if (!Math.sign) {
    return (x > 0) - (x < 0) || x;
  } else {
    return Math.sign(x);
  }
}

export default getSign;
