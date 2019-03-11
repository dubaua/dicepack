import assert from 'assert';
import { minDice } from '../index.js';

describe('minDice', function() {
  describe('returns a number', function() {
    const result = minDice([{ count: 3, side: 4 }, { count: 6, side: 1 }]);
    const typeofResult = typeof result;
    it('returns result type of number', function() {
      assert.strictEqual(typeofResult, 'number');
    });
  });

  describe('works correctly with positive', function() {
    const result = minDice([{ count: 3, side: 4 }, { count: 6, side: 1 }]);
    it('minDice 3d4+6 config = 9', function() {
      assert.strictEqual(result, 9);
    });
  });

  describe('works correctly with negative', function() {
    const result = minDice([{ count: 1, side: 6 }, { count: -1, side: 6 }]);
    it('minDice d6-d6 config = -5', function() {
      assert.strictEqual(result, -5);
    });
  });

  describe('returns detailed results if detailed flag given', function() {
    const isDetailed = function(result) {
      return (
        result.hasOwnProperty('result') &&
        result.hasOwnProperty('rolls') &&
        typeof result.result === 'number' &&
        Array.isArray(result.rolls)
      );
    };

    const result = minDice([{ count: 3, side: 4 }, { count: 6, side: 1 }], true);
    it('returns result type of detailed', function() {
      assert.strictEqual(isDetailed(result), true);
    });

    it('detailed rolls 3d4+6 length = 2, count of dice notation parts', function() {
      assert.strictEqual(result.rolls.length, 2);
    });

    const [d4s, flat] = result.rolls;
    it('detailed rolls 3d4+6 is equal to count parts (3, 6)', function() {
      assert.strictEqual(d4s, 3);
      assert.strictEqual(flat, 6);
    });
  });
});
