import { addProperty } from '../utils.js';
import Result from './Result';

export default class Detailed {
  constructor({ result, rolls }) {
    addProperty({
      value: result,
      key: 'result',
      validator: x => typeof x === 'number' && Math.round(x) === x,
      description: 'an integer',
      context: this,
    });

    addProperty({
      value: rolls,
      key: 'rolls',
      validator: x => Array.isArray(x) && x.every(y => Array.isArray(y) && y.every(z => z instanceof Result)),
      description: 'an array of Results',
      context: this,
    });
  }
}
