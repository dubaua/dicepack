/**
 * A regexp object
 * @typedef {Object} Regexp
 */

// TODO is it type of error?

/**
 * Return given string if it matched regexp or throws Error
 * @param {string} string
 * @param {Regexp} regexp
 * @returns {string}
 */

function validate(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given string ${string} doesn't match given regular expression ${regexp}`);
  }
  return string;
}

export default validate;
