import assert from 'assert';
import { roll } from '../index.js';

describe('roll', function() {
  describe('returns a number', function() {
    const result = roll('2d12+3d6+5');
    const typeofResult = typeof result;
    it('returns result type of number', function() {
      assert.strictEqual(typeofResult, 'number');
    });
  });

  describe('result is in range', function() {
    const result = roll('2d12+3d6+5');
    const isInRange = 10 <= result && result <= 47;
    it('result of roll 2d12+3d6+5 is between 10 and 47', function() {
      assert.strictEqual(isInRange, true);
    });
  });

  describe('returns detailed results if detailed flag given', function() {
    const result = roll('2d12+3d6+5', true);
    const isDetailed = function(result) {
      return (
        result.hasOwnProperty('result') &&
        result.hasOwnProperty('rolls') &&
        typeof result.result === 'number' &&
        Array.isArray(result.rolls)
      );
    };

    it('returns result type of detailed', function() {
      assert.strictEqual(isDetailed(result), true);
    });

    it('detailed rolls 2d12+3d6+5 length = 3, count of dice notation parts', function() {
      assert.strictEqual(result.rolls.length, 3);
    });

    const [d12s, d6s, flat] = result.rolls;
    it('each rolls 2d12+3d6+5 part length is equal to count of notation (2, 3, 1)', function() {
      assert.strictEqual(d12s.length, 2);
      assert.strictEqual(d6s.length, 3);
      assert.strictEqual(flat.length, 1);
    });
  });

  describe('1000 d20 rolls', function() {
    let rolls = [];
    for (let i = 0; i < 1000; i++) {
      rolls.push(roll('d20'));
    }
    const everyInRange = rolls.every(result => 1 <= result && result <= 20);
    it('every result in range 1..20', function() {
      assert.strictEqual(everyInRange, true);
    });
  });
});
