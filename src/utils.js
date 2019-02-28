export const castToNumber = string => Number(string);

export const sum = (accumulator, current) => accumulator + current;

export const flatten = (accumulator, current) =>
  Array.isArray(current)
    ? accumulator.concat(current.reduce(flatten, []))
    : accumulator.concat(current);

export const rollDice = ({ count, side, sign }) =>
  times(() => rollDie(side), count).map(result => result * sign);

export const minDice = ({ count, side, sign }) =>
  sign === -1 ? count * side * sign : count * sign;

export const maxDice = ({ count, side, sign }) =>
  sign === -1 ? count * sign : count * side * sign;

export const times = (fn, count) => {
  var willReturn = [];
  let step = 0;
  while (step < count) {
    willReturn[step] = fn();
    step++;
  }
  return willReturn;
};

export const rollDie = side => Math.floor(random() * side) + 1;

export const random = () => {
  const _crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);
  _crypto.getRandomValues(array);
  return array[0] * Math.pow(2, -32);
};