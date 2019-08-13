import addProperty from '../utils/addProperty.js';
import isInteger from '../utils/isInteger.js';

export default class Result {
  constructor({ side, roll }) {
    addProperty({
      value: side,
      key: 'side',
      validator: x => isInteger(x) && x >= 0,
      description: 'non-negative integer',
      context: this,
    });

    addProperty({
      value: roll,
      key: 'roll',
      validator: x => isInteger(x),
      description: 'an integer',
      context: this,
    });

    this.type = side === 0 || side === 1 ? 'number' : 'die';
  }
}
