import { sumReducer, castToNumber, rollDice } from "./utils.js";

const DICE_EXPRESSION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const SINGLE_DICE_REGEXP = /^-?\d*d\d+$/;

const processExpression = expression =>
  SINGLE_DICE_REGEXP.test(expression)
    ? rollDice(expression)
    : castToNumber(expression);

const rollExpression = expression => {
  if (DICE_EXPRESSION_REGEXP.test(expression)) {
    const rolls = expression
      .replace(/-/g, "+-")
      .split("+")
      .map(processExpression)
      .flat(1);
    return {
      rolls,
      result: rolls.reduce(sumReducer, 0)
    };
  } else {
    throw new Error("Given dice expression isn't valid.");
  }
};

export default rollExpression;