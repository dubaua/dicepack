/**
 * Removes spaces and turn lowercaase
 *
 * @param {string} string
 * @returns {string} sanitized string
 */

const sanitize = string =>
  string
    .toString()
    .replace(/\s/g, '')
    .toLowerCase();

export default sanitize;
