const NOTATION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;

const validate = function(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given expression ${string} isn't valid`);
  }
  return string;
};

const castToNatural = function(string) {
  const number = parseInt(string);
  return isNaN(number) ? 1 : Math.abs(number);
};

const getDice = function(expression) {
  const [count, _side] = validate(expression, DICE_REGEXP).split('d').map(castToNatural);
  const side = typeof _side === 'undefined' ? 1 : _side;
  const sign = expression[0] === '-' ? -1 : 1;
  return { count, side, sign };
};

const parse = expression =>
  validate(expression, NOTATION_REGEXP)
    .replace(/-/g, '+-')
    .split('+')
    .filter(string => string !== '')
    .map(getDice);

const getRandomInt = max => Math.floor(Math.random() * max) + 1;

const rollDie = function({ count, side, sign }) {
  let results = [];
  // no need to roll d1
  if (side === 1) {
    results.push(count * sign);
  } else {
    for (let i = 0; i < count; i++) {
      results.push(getRandomInt(side) * sign);
    }
  }
  return results;
};

const minimize = function({ count, side, sign }) {
  // maximize in case of negative roll
  const _side = sign === -1 ? side : 1;
  return count * sign * _side;
};

const maximize = function({ count, side, sign }) {
  // minimize in case of negative roll
  const _side = sign === -1 ? 1 : side;
  return count * sign * _side;
};

const sum = (accumulator, current) => accumulator + current;

const flatten = (accumulator, current) =>
  Array.isArray(current)
    ? accumulator.concat(current.reduce(flatten, []))
    : accumulator.concat(current);

const collect = function(results, detailed) {
  const rolls = results.reduce(flatten, []);
  const result = rolls.reduce(sum, 0);
  if (detailed) {
    return { result, rolls };
  }
  return result;
};

const rollDice = (dice, detailed) => collect(dice.map(rollDie), detailed);

const minDice = (dice, detailed) => collect(dice.map(minimize), detailed);

const maxDice = (dice, detailed) => collect(dice.map(maximize), detailed);

const roll = (expression, detailed) => rollDice(parse(expression), detailed);

const min = (expression, detailed) => minDice(parse(expression), detailed);

const max = (expression, detailed) => maxDice(parse(expression), detailed);

export { parse, rollDice, minDice, maxDice, roll, min, max };
