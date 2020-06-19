import assert from 'assert';
import castToInt from '@/utils/castToInt.js';

describe('castToInt', () => {
  describe('works with strings representing integers', () => {
    it(`'25' => 25`, () => {
      assert.strictEqual(castToInt('25'), 25);
    });
  });

  describe('drops fractional part', () => {
    it(`'14.5' => 14`, () => {
      assert.strictEqual(castToInt('14.5'), 14);
    });
  });

  describe('not numbers turns to zero', () => {
    it('String => 0', () => {
      assert.strictEqual(castToInt('String'), 0);
    });
    it('Boolean => 0', () => {
      assert.strictEqual(castToInt(true), 0);
    });
    it('Array => 0', () => {
      assert.strictEqual(castToInt([]), 0);
    });
    it('Function => 0', () => {
      function emptyFunc() {
        return true;
      }
      assert.strictEqual(castToInt(emptyFunc), 0);
    });
    it('Object => 0', () => {
      assert.strictEqual(castToInt({}), 0);
    });
  });
});
