import addProperty from '../utils/addProperty.js';
import isInteger from '../utils/isInteger.js';

export default class Dice {
  constructor({ count, side }) {
    addProperty({
      value: count,
      key: 'count',
      validator: x => isInteger(x),
      description: 'an integer',
      context: this,
    });

    addProperty({
      value: side,
      key: 'side',
      validator: x => isInteger(x) && x >= 0,
      description: 'non-negative integer',
      context: this,
    });
  }
}
