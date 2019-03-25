const NOTATION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;
const STARTING_D_WIHTOUT_COUNT = /^(-?)d/;

const validate = function(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given expression ${string} isn't valid`);
  }
  return string;
};

const castToNumber = string => parseInt(string, 10) || 0;

const getDice = function(expression) {
  const [count = 1, side = 1] = validate(expression, DICE_REGEXP)
    .replace(STARTING_D_WIHTOUT_COUNT, '$11d') // restore dropped 1d with sign 1d
    .split('d')
    .map(castToNumber);
  return { count, side };
};

const parse = expression =>
  validate(expression, NOTATION_REGEXP)
    .replace(/-/g, '+-')
    .split('+')
    .filter(string => string !== '')
    .map(getDice);

const getRandomInt = max => Math.floor(Math.random() * max) + 1;

const rollDie = function({ count, side }) {
  let results = [];
  if (side === 0 || count === 0) {
    // no need to roll 0
    results.push(0);
  } else if (side === 1) {
    // no need to roll d1
    results.push(count);
  } else {
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    for (let i = 0; i < rollCount; i++) {
      results.push(sign * getRandomInt(side));
    }
  }
  return results;
};

const minimize = ({ count, side }) => Math.min(count, count * side);

const maximize = ({ count, side }) => Math.max(count, count * side);

const sum = (accumulator, current) => accumulator + current;

const flatten = (accumulator, current) =>
  Array.isArray(current) ? accumulator.concat(current.reduce(flatten, [])) : accumulator.concat(current);

const collect = function(rolls, detailed) {
  const result = rolls.reduce(flatten, []).reduce(sum, 0);
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

export { parse, getDice, rollDie, minimize, maximize, rollDice, minDice, maxDice, roll, min, max };
