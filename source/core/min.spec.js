import assert from 'assert';
import min from './min.js';

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
});
