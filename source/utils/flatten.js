const flatten = (accumulator, current) =>
  Array.isArray(current) ? accumulator.concat(current.reduce(flatten, [])) : accumulator.concat(current);

export default flatten;
