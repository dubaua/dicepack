export function addProperty({ value, key, validator, description, context }) {
  if (typeof value === 'undefined') {
    throw new TypeError(`${key} is required`);
  }
  if (typeof validator === 'function' && validator(value)) {
    context[key] = value;
  } else {
    throw new TypeError(`expected ${key} is ${description}, got ${typeof value} ${value}.`);
  }
}

export function validate(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given notation ${string} isn't valid`);
  }
  return string;
}

export const castToNumber = string => parseInt(string, 10) || 0;

export const getRandomInt = max => Math.floor(Math.random() * max) + 1;

export const sum = (accumulator, current) => accumulator + current;

export const flatten = (accumulator, current) =>
  Array.isArray(current) ? accumulator.concat(current.reduce(flatten, [])) : accumulator.concat(current);

export const directProduct = (accumulator, current) =>
  current.map(x => accumulator.map(y => sum(x, y))).reduce(flatten, []);

export const sorted = (current, index, source) => index === 0 || source[index - 1] > current;

export const unique = (accumulator, current) => [
  ...accumulator,
  ...(accumulator.indexOf(current) !== -1 ? [] : [current]),
];

export const getDiceComplexity = (accumulator, current) => accumulator * Math.pow(current.side, current.count);

export const getAverage = (min, max) => (min + max) / 2;
