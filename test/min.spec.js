import assert from 'assert';
import { min } from '../index.js';

describe('min', function() {
  describe('returns a number', function() {
    const result = min('2d6+5');
    const typeofResult = typeof result;
    it('returns result type of number', function() {
      assert.strictEqual(typeofResult, 'number');
    });
  });

  describe('works correctly with positive', function() {
    const result = min('2d6+5');
    it('min 2d6+5 = 7', function() {
      assert.strictEqual(result, 7);
    });
  });

  describe('works correctly with negative', function() {
    const result = min('d12-d6');
    it('min d12-d6 = -5', function() {
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
    const result = min('3d10+6d8+12', true);
    it('returns result type of detailed', function() {
      assert.strictEqual(isDetailed(result), true);
    });
  });
});
