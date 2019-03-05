import assert from 'assert';
import { maxDice } from '../index.js';

describe('maxDice', function() {
  describe('returns a number', function() {
    const result = maxDice([{ count: 3, side: 8 }, { count: 1, side: 1 }]);
    const typeofResult = typeof result;
    it('returns result type of number', function() {
      assert.strictEqual(typeofResult, 'number');
    });
  });

  describe('works correctly with positive', function() {
    const result = maxDice([{ count: 3, side: 8 }, { count: 1, side: 1 }]);
    it('maxDice 3d8+1 config = 25', function() {
      assert.strictEqual(result, 25);
    });
  });

  describe('works correctly with negative', function() {
    const result = maxDice([{ count: 1, side: 6 }, { count: -1, side: 6 }]);
    it('maxDice d6-d6 config = 5', function() {
      assert.strictEqual(result, 5);
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
    const result = maxDice([{ count: 3, side: 4 }, { count: 6, side: 1 }], true);
    it('returns result type of detailed', function() {
      assert.strictEqual(isDetailed(result), true);
    });
  });
});
