import { sum, flatten, castToNumber, rollDice } from "./utils.js";

const DICE_EXPRESSION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const SINGLE_DICE_REGEXP = /^-?\d*d\d+$/;

const processExpression = expression =>
  SINGLE_DICE_REGEXP.test(expression)
    ? rollDice(expression)
    : castToNumber(expression);

const rollExpression = (expression, detailed) => {
  if (!DICE_EXPRESSION_REGEXP.test(expression)) {
    throw new Error("Given dice expression isn't valid.");
  } else {
    const rolls = expression
      .replace(/-/g, "+-")
      .split("+")
      .map(processExpression)
      .reduce(flatten, []);

    const result = rolls.reduce(sum, 0);
    if (detailed === true) {
      return { rolls, result };
    }

    return rolls;
  }
};

export default rollExpression;