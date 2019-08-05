import assert from 'assert';
import Dice from '../types/Dice.js';
import toDice from './toDice.js';

describe('toDice', function() {
  const result = toDice('2d6+5');
  const typeofResultIsArray = Array.isArray(result);
  it('returns result type of array', function() {
    assert.strictEqual(typeofResultIsArray, true);
  });

  const length = result.length;
  it('toDice 2d6+5 result length = 2', function() {
    assert.strictEqual(length, 2);
  });

  const eachIsDice = result.every(dice => dice instanceof Dice);
  it('each result instance of Dice', function() {
    assert.strictEqual(eachIsDice, true);
  });

  it("throws an error if expression isn't valid", function() {
    assert.throws(function() {
      toDice('2d');
    });
  });
});
