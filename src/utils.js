export const castToNumber = string => Number(string);

export const sum = (accumulator, current) => accumulator + current;

export const flatten = (accumulator, current) =>
  Array.isArray(current)
    ? accumulator.concat(current.reduce(flatten, []))
    : accumulator.concat(current);

export const getRandomInt = max => Math.floor(Math.random() * max) + 1;