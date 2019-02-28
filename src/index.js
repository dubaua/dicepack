import {
  rollDice,
  minDice,
  maxDice,
  flatten,
  sum,
  castToNumber
} from "./utils.js";

const DICE_EXPRESSION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const SINGLE_DICE_REGEXP = /^-?\d*d\d+$/;

const validate = expression => {
  if (!DICE_EXPRESSION_REGEXP.test(expression)) {
    throw new Error("Given dice expression isn't valid.");
  }
  return expression;
};

const parseSingleExpression = expression => {
  if (!SINGLE_DICE_REGEXP.test(expression)) {
    return castToNumber(expression);
  }
  const isNegative = expression.charAt(0) === "-";
  const _expression = isNegative ? expression.slice(1) : expression;
  const [_count, side] = _expression.split("d").map(castToNumber);
  const count = Math.abs(_count) || 1;
  const sign = isNegative ? -1 : 1;
  return { count, side, sign };
};

const tryNumber = fn => config =>
  typeof config === "number" ? config : fn(config);

const collectResultsFor = (fn, config, detailed) => {
  const rolls = config.map(tryNumber(fn)).reduce(flatten, []);
  const result = rolls.reduce(sum, 0);
  if (detailed) {
    return { rolls, result };
  }
  return result;
};

/**
 * Pasre D&D expression to dice configuration for further rolling.
 * @param {string} expression - D&D dice expression
 * @returns {Array.<object, number} array of dice configs  or numbers
 */
export const parseExpression = expression =>
  validate(expression)
    .replace(/-/g, "+-")
    .split("+")
    .map(parseSingleExpression);

/**
 *
 *
 * @param {*} expression
 */
export const rollExpression = (expression, detailed) =>
  rollDiceConfig(parseExpression(expression), detailed);

export const rollDiceConfig = (config, detailed) =>
  collectResultsFor(rollDice, config, detailed);

export const minDiceConfig = (config, detailed) =>
  collectResultsFor(minDice, config, detailed);

export const maxDiceConfig = (config, detailed) =>
  collectResultsFor(maxDice, config, detailed);