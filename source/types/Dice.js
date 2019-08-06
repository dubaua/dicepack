import addProperty from '../utils/addProperty.js';

export default class Dice {
  constructor({ count, side }) {
    addProperty({
      value: count,
      key: 'count',
      validator: x => typeof x === 'number' && x !== 0 && Math.round(x) === x,
      description: 'a non zero integer',
      context: this,
    });

    addProperty({
      value: side,
      key: 'side',
      validator: x => typeof x === 'number' && x > 0 && Math.round(x) === x,
      description: 'a natural number',
      context: this,
    });
  }
}
