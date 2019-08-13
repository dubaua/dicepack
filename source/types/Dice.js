import addProperty from '../utils/addProperty.js';

export default class Dice {
  constructor({ count, side }) {
    addProperty({
      value: count,
      key: 'count',
      validator: x => typeof x === 'number' && Math.round(x) === x,
      description: 'an integer',
      context: this,
    });

    addProperty({
      value: side,
      key: 'side',
      validator: x => typeof x === 'number' && x >= 0 && Math.round(x) === x,
      description: 'non-negative integer',
      context: this,
    });
  }
}
