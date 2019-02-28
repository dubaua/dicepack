import { flatten, sum, castToNumber, getRandomInt } from  "./utils.js";

const DICE_EXPRESSION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const SINGLE_DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;

const validate = function(expression) {
  if (
    typeof expression === "string" &&
    !DICE_EXPRESSION_REGEXP.test(expression)
  ) {
    throw new Error("Given dice expression isn't valid");
  }
  return expression;
};

const getDice = function(expression) {
  if (!SINGLE_DICE_REGEXP.test(expression)) {
    throw new Error("Given single dice expression isn't valid");
  }
  const [_count, _side] = expression.split("d").map(castToNumber);
  const count = Math.abs(_count) || 1;
  const side = _side || 1;
  const sign = _count < 0 ? -1 : 1;
  return { count, side, sign };
};

const parse = expression =>
  validate(expression)
    .replace(/-/g, "+-")
    .split("+")
    .map(getDice);

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
