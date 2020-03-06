/**
 * A regexp object
 * @typedef {Object} Regexp
 */

/**
 * Passes down valid string or throws TypeError
 *
 * @param {string} string
 * @param {Regexp} regexp
 * @returns {string}
 */

function validate(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new TypeError(`Given notation ${string} isn't valid`);
  }
  return string;
}

export default validate;
