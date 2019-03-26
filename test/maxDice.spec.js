import assert from 'assert';
import { maxDice, Detailed } from '../index.js';

describe('maxDice', function() {
  describe('returns a number', function() {
    it('returns result type of number', function() {
      assert.strictEqual(typeof maxDice([{ count: 3, side: 8 }, { count: 1, side: 1 }]), 'number');
    });
  });

  describe('works correctly with positive', function() {
    it('maxDice 3d8+1 config = 25', function() {
      assert.strictEqual(maxDice([{ count: 3, side: 8 }, { count: 1, side: 1 }]), 25);
    });
  });

  describe('works correctly with negative', function() {
    it('maxDice d6-d6 config = 5', function() {
      assert.strictEqual(maxDice([{ count: 1, side: 6 }, { count: -1, side: 6 }]), 5);
    });
  });

  describe('returns detailed results if detailed flag given', function() {
    const result = maxDice([{ count: 3, side: 4 }, { count: 6, side: 1 }], true);

    it('returns result type of Detailed', function() {
      assert.strictEqual(result instanceof Detailed, true);
    });

    it('detailed rolls 3d4+6 length = 2, count of dice notation parts', function() {
      assert.strictEqual(result.rolls.length, 2);
    });

    const [d4s, flat] = result.rolls;
    it('detailed rolls 3d4+6 is equal to product of count and side (12, 6)', function() {
      assert.strictEqual(d4s, 12);
      assert.strictEqual(flat, 6);
    });
  });
});
