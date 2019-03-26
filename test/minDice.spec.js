import assert from 'assert';
import { minDice, Detailed } from '../index.js';

describe('minDice', function() {
  describe('returns a number', function() {
    it('returns result type of number', function() {
      assert.strictEqual(typeof minDice([{ count: 3, side: 4 }, { count: 6, side: 1 }]), 'number');
    });
  });

  describe('works correctly with positive', function() {
    it('minDice 3d4+6 config = 9', function() {
      assert.strictEqual(minDice([{ count: 3, side: 4 }, { count: 6, side: 1 }]), 9);
    });
  });

  describe('works correctly with negative', function() {
    it('minDice d6-d6 config = -5', function() {
      assert.strictEqual(minDice([{ count: 1, side: 6 }, { count: -1, side: 6 }]), -5);
    });
  });

  describe('returns detailed results if detailed flag given', function() {
    const result = minDice([{ count: 3, side: 4 }, { count: 6, side: 1 }], true);

    it('returns result type of Detailed', function() {
      assert.strictEqual(result instanceof Detailed, true);
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
