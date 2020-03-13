/**
 * Split an array to two arrays matched and unmatched validator function
 * @param {Array} array array to split
 * @param {function} validator a validator function
 * @returns Array<Array> array of matched array and unmatched array
 */

function splitArrayByFilter(array = [], validator) {
  const matched = [];
  const unmatched = [];
  array.forEach(element => {
    (!validator || validator(element) ? matched : unmatched).push(element);
  });
  return [matched, unmatched];
}

export default splitArrayByFilter;
