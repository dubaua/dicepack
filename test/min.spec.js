import assert from 'assert';
import { min, Detailed } from '../index.js';

describe('min', function() {
  describe('returns a number', function() {
    it('returns result type of number', function() {
      assert.strictEqual(typeof min('2d6+5'), 'number');
    });
  });

  describe('works correctly with positive', function() {
    it('min 2d6+5 = 7', function() {
      assert.strictEqual(min('2d6+5'), 7);
    });
  });

  describe('works correctly with negative', function() {
    it('min d12-d6 = -5', function() {
      assert.strictEqual(min('d12-d6'), -5);
    });
  });

  describe('returns detailed results if detailed flag given', function() {
    const result = min('3d10+6d8+12', true);

    it('returns result type of Detailed', function() {
      assert.strictEqual(result instanceof Detailed, true);
    });

    it('detailed rolls 3d10+6d8+12 length = 3, count of dice notation parts', function() {
      assert.strictEqual(result.rolls.length, 3);
    });

    const [d10s, d8s, flat] = result.rolls;
    it('detailed rolls 3d10+6d8+12 is equal to count parts (3, 6, 12)', function() {
      assert.strictEqual(d10s, 3);
      assert.strictEqual(d8s, 6);
      assert.strictEqual(flat, 12);
    });
  });
});
