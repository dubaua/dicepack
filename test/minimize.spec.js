import assert from 'assert';
import { minimize } from '../index.js';

describe('minimize', function() {
  describe('returns a number', function() {
    const result = minimize({ count: 3, side: 6 });
    const isNumber = typeof result === 'number';
    it('returns result type of number', function() {
      assert.strictEqual(isNumber, true);
    });
  });

  describe('works correctly with positive', function() {
    const result = minimize({ count: 3, side: 6 });
    it('minimize 3d6 = 3', function() {
      assert.strictEqual(result, 3);
    });
  });

  describe('works correctly with negative', function() {
    const result = minimize({ count: -3, side: 6 });
    it('minimize -3d6 = -18', function() {
      assert.strictEqual(result, -18);
    });
  });
});
