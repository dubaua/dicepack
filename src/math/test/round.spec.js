import assert from 'assert';
import round from '@/math/round.js';

describe('round', () => {
  describe('zero precision', () => {
    it('round down 1.25 => 1', () => {
      assert.strictEqual(round(1.25, 0), 1);
    });
    it('round up 1.5 => 2', () => {
      assert.strictEqual(round(1.5, 0), 2);
    });
    it('negatives round down -1.25 => -1', () => {
      assert.strictEqual(round(-1.25, 0), -1);
    });
    it('negatives round up -1.5 => -2', () => {
      assert.strictEqual(round(-1.5, 0), -2);
    });
  });
  describe('non zero precision 3', () => {
    it('round down 1.1134 => 1.113', () => {
      assert.strictEqual(round(1.1134, 3), 1.113);
    });
    it('round up 2.2295 => 2.23', () => {
      assert.strictEqual(round(2.2295, 3), 2.23);
    });
    it('already precise 1.253 => 1.253', () => {
      assert.strictEqual(round(1.253, 3), 1.253);
    });
    it('negatives round down -0.00499 => -0.005', () => {
      assert.strictEqual(round(-0.00499, 3), -0.005);
    });
    it('negatives round up -1.4596 => -1.46', () => {
      assert.strictEqual(round(-1.4596, 3), -1.46);
    });
    it('negatives already precise -0.001 => -0.001', () => {
      assert.strictEqual(round(-0.001, 3), -0.001);
    });
  });
  describe('skipped precision (defalut = 2)', () => {
    it('round down 1.451 => 1.45', () => {
      assert.strictEqual(round(1.451), 1.45);
    });
    it('round up 2.2295 => 2.23', () => {
      assert.strictEqual(round(2.2295), 2.23);
    });
    it('already precise 3.14 => 3.14', () => {
      assert.strictEqual(round(3.14), 3.14);
    });
    it('negatives round down -0.444 => -0.44', () => {
      assert.strictEqual(round(-0.444), -0.44);
    });
    it('negatives round up -1.459 => -1.46', () => {
      assert.strictEqual(round(-1.459), -1.46);
    });
    it('negatives already precise -2.75 => -2.75', () => {
      assert.strictEqual(round(-2.75), -2.75);
    });
  });
  describe('not numbers', () => {
    it('String => NaN', () => {
      assert.strictEqual(round('String', 0), NaN);
    });
    it('Boolean => NaN', () => {
      assert.strictEqual(round(true, 0), NaN);
    });
    it('Array => NaN', () => {
      assert.strictEqual(round([], 0), NaN);
    });
    it('Function => NaN', () => {
      function emptyFunc() {
        return true;
      }
      assert.strictEqual(round(emptyFunc, 0), NaN);
    });
    it('Object => NaN', () => {
      assert.strictEqual(round({}, 0), NaN);
    });
  });
});
