import addProperty from '../utils/addProperty.js';
import isInteger from '../utils/isInteger.js';

export default class Result {
  constructor({ type, side, rolled }) {
    addProperty({
      value: type,
      key: 'type',
      validator: x => x === 'die' || x === 'number',
      description: "string 'die' or 'number'",
      context: this,
    });

    addProperty({
      value: side,
      key: 'side',
      validator: x => isInteger(x) && x >= 0,
      description: 'non-negative integer',
      context: this,
    });

    addProperty({
      value: rolled,
      key: 'rolled',
      validator: x => isInteger(x),
      description: 'an integer',
      context: this,
    });
  }
}
