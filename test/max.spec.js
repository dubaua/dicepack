import assert from 'assert';
import { max, Detailed } from '../index.js';

describe('max', function() {
  describe('returns a number', function() {
    it('returns result type of number', function() {
      assert.strictEqual(typeof max('d12+4d6+5'), 'number');
    });
  });

  describe('works correctly with positive', function() {
    it('max d12+4d6+5 = 41', function() {
      assert.strictEqual(max('d12+4d6+5'), 41);
    });
  });

  describe('works correctly with negative', function() {
    it('max d12-d6 = 11', function() {
      assert.strictEqual(max('d12-d6'), 11);
    });
  });
});
