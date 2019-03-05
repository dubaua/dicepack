import assert from 'assert';
import { parse } from '../index.js';

describe('parse', function() {
  const result = parse('2d6+5');
  const typeofResultIsArray = Array.isArray(result);
  it('returns result type of array', function() {
    assert.strictEqual(typeofResultIsArray, true);
  });

  const length = result.length;
  it('parse 2d6+5 result length = 2', function() {
    assert.strictEqual(length, 2);
  });

  const isDice = function(dice) {
    return (
      dice.hasOwnProperty('count') &&
      dice.hasOwnProperty('side') &&
      typeof dice.count === 'number' &&
      typeof dice.side === 'number'
    );
  };

  const eachIsDice = result.every(isDice);
  it('each result type of dice', function() {
    assert.strictEqual(eachIsDice, true);
  });

  it('throws an error if expression isn\'t valid', function() {
    assert.throws(function() {
      parse('2d');
    })
  })
});
