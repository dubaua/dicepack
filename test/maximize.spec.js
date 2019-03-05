import assert from 'assert';
import { maximize } from '../index.js';

describe('maximize', function() {
  describe('returns a number', function() {
    const result = maximize({ count: 2, side: 8 });
    const isNumber = typeof result === 'number';
    it('returns result type of number', function() {
      assert.strictEqual(isNumber, true);
    });
  });

  describe('works correctly with positive', function() {
    const result = maximize({ count: 2, side: 8 });
    it('maximize 2d8 = 16', function() {
      assert.strictEqual(result, 16);
    });
  });

  describe('works correctly with negative', function() {
    const result = maximize({ count: -2, side: 8 });
    it('maximize -2d8 = -2', function() {
      assert.strictEqual(result, -2);
    });
  });
});
