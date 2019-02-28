export const castToNumber = string => Number(string);

export const sumReducer = (accumulator, current) => accumulator + current;

export const rollDie = side => {
  return Math.floor(random() * side) + 1;
};

export const times = (fn, count) => {
  var willReturn = [];
  let step = 0;
  while (step < count) {
    willReturn[step] = fn();
    step++;
  }
  return willReturn;
};

export const random = () => {
  let array = new Uint32Array(1);
  const _crypto = window.crypto || window.msCrypto;
  _crypto.getRandomValues(array);
  return array[0] * Math.pow(2, -32);
};

export const rollDice = expression => {
  const isNegative = expression.charAt(0) === "-";
  const _expression = isNegative ? expression.slice(1) : expression;
  const [count, side] = _expression.split("d").map(castToNumber);
  const sign = isNegative ? -1 : 1;
  return times(() => rollDie(side), Math.abs(count) || 1).map(
    result => result * sign
  );
};