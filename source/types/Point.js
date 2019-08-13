import addProperty from '../utils/addProperty.js';
import isInteger from '../utils/isInteger.js';

export default class Point {
  constructor({ result, chance }) {
    addProperty({
      value: result,
      key: 'result',
      validator: x => isInteger(x),
      description: 'an integer',
      context: this,
    });

    addProperty({
      value: chance,
      key: 'chance',
      validator: x => typeof x === 'number' && 0 <= x && x <= 1,
      description: 'a number between 0 and 1',
      context: this,
    });
  }
}
