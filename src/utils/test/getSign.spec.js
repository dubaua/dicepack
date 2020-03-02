import assert from 'assert';
import getSign from '@/utils/getSign.js';

describe('getSign', () => {
  describe('numbers', () => {
    it('positive numbers', () => {
      assert.strictEqual(getSign(20), 1);
    });
    it('negative numbers', () => {
      assert.strictEqual(getSign(-0.5), -1);
    });
    it('zeroes', () => {
      assert.strictEqual(getSign(0), 0);
    });
    it('negative zeroes, lul', () => {
      assert.strictEqual(getSign(-0), -0);
    });
  });
  describe('not numbers', () => {
    it('String => NaN', () => {
      assert.strictEqual(getSign('String'), NaN);
    });
    it('Boolean => NaN', () => {
      assert.strictEqual(getSign(true), NaN);
    });
    it('Array => NaN', () => {
      assert.strictEqual(getSign([]), NaN);
    });
    it('Function => NaN', () => {
      function emptyFunc() {
        return true;
      }
      assert.strictEqual(getSign(emptyFunc), NaN);
    });
    it('Object => NaN', () => {
      assert.strictEqual(getSign({}), NaN);
    });
  });
});
