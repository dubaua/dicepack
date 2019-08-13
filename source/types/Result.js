import addProperty from '../utils/addProperty.js';

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
      validator: x => typeof x === 'number' && x >= 0 && Math.round(x) === x,
      description: 'non-negative integer',
      context: this,
    });

    addProperty({
      value: rolled,
      key: 'rolled',
      validator: x => typeof x === 'number' && Math.round(x) === x,
      description: 'an integer',
      context: this,
    });
  }
}
