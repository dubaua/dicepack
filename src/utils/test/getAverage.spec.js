import assert from 'assert';
import getAverage from '../getAverage.js';

describe('getAverage', () => {
  describe('correctly calculates average', () => {
    it('average of 1,2,3 => 2', () => {
      assert.strictEqual(getAverage(1, 2, 3), 2);
    });
    it('average of 1,2,3,4 => 2.5', () => {
      assert.strictEqual(getAverage(1, 2, 3, 4), 2.5);
    });
    it('average same 2,2,2 => 2', () => {
      assert.strictEqual(getAverage(2, 2, 2), 2);
    });
  });
});
