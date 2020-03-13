/**
 * Removes spaces and turn lowercaase
 * @param {string} string
 * @returns {string} sanitized string
 */

function sanitize(string) {
  return string
    .toString()
    .replace(/\s/g, '')
    .toLowerCase();
}

export default sanitize;
