import Dice from '../types/Dice.js';
import { validate, castToNumber } from '../utils.js';

const DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;
const STARTING_D_WIHTOUT_COUNT = /^(-?)d/;

export default function getDice(notation) {
  const [count = 1, side = 1] = validate(notation, DICE_REGEXP)
    .replace(STARTING_D_WIHTOUT_COUNT, '$11d') // restore dropped 1d with sign 1d
    .split('d')
    .map(castToNumber);
  return new Dice({ count, side });
}
