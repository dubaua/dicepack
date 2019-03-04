const NOTATION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;
const STARTING_D_WIHTOUT_MULTIPLIER = /^(-?)d/;

const validate = function(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given expression ${string} isn't valid`);
  }
  return string;
};

const castToNumber = function(string) {
  const number = parseInt(string);
  return typeof number === 'undefined' || isNaN(number) ? 1 : number;
};

const getDice = function(expression) {
  const [_multiplier, _side] = validate(expression, DICE_REGEXP)
    // restore dropped 1d with sign 1d
    .replace(STARTING_D_WIHTOUT_MULTIPLIER, '$11d')
    .split('d')
    .map(castToNumber);
  const side = castToNumber(_side);
  const multiplier = _multiplier === -0 ? 0 : _multiplier;
  return { multiplier, side };
};

const parse = expression =>
  validate(expression, NOTATION_REGEXP)
    .replace(/-/g, '+-')
    .split('+')
    .filter(string => string !== '')
    .map(getDice);

const getRandomInt = max => Math.floor(Math.random() * max) + 1;

const rollDie = function({ multiplier, side }) {
  let results = [];
  if (side === 0 || multiplier === 0) {
    // no need to roll 0
    results.push(0);
  } else if (side === 1) {
    // no need to roll d1
    results.push(multiplier);
  } else {
    const rollCount = Math.abs(multiplier);
    const sign = multiplier / rollCount;
    for (let i = 0; i < rollCount; i++) {
      results.push(sign * getRandomInt(side));
    }
  }
  return results;
};

// maximize in case of negative roll
const minimize = ({ multiplier, side }) => multiplier * (multiplier < 0 ? side : 1);

// minimize in case of negative roll
const maximize = ({ multiplier, side }) => multiplier * (multiplier < 0 ? 1 : side);

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

export { parse, getDice, rollDice, minDice, maxDice, roll, min, max };
