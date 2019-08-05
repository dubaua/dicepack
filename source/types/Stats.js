import { addProperty } from '../utils.js';

export default class Stats {
  constructor({ distribution, average, variance, standardDeviation }) {
    addProperty({
      value: distribution,
      key: 'distribution',
      validator: x => Array.isArray(x),
      description: 'an array',
      context: this,
    });

    addProperty({
      value: average,
      key: 'average',
      validator: x => typeof x === 'number',
      description: 'a number',
      context: this,
    });

    addProperty({
      value: variance,
      key: 'variance',
      validator: x => typeof x === 'number' && x >= 0,
      description: 'a non negative number',
      context: this,
    });

    addProperty({
      value: standardDeviation,
      key: 'standardDeviation',
      validator: x => typeof x === 'number' && x >= 0,
      description: 'a non negative number',
      context: this,
    });
  }
}
