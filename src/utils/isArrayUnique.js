/**
 * Checks if given array contains only unique elements
 * @param {Array} array flat array
 * @returns {boolean}
 */

function isArrayUnique(array) {
  return (
    array.reduce(
      (accumulator, current) => [...accumulator, ...(accumulator.indexOf(current) !== -1 ? [] : [current])],
      [],
    ).length === array.length
  );
}

export default isArrayUnique;
