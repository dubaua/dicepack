import { addProperty } from '../utils.js';

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
      validator: x => typeof x === 'number' && x > 0 && Math.round(x) === x,
      description: 'a natural number',
      context: this,
    });

    addProperty({
      value: rolled,
      key: 'rolled',
      validator: x => typeof x === 'number' && x !== 0 && Math.round(x) === x,
      description: 'a natural number',
      context: this,
    });
  }
}
