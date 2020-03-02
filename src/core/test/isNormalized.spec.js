import assert from 'assert';
import isNormalized from '../isNormalized.js';

describe('isNormalized', () => {
  describe('returns a boolean', () => {
    it('returns result type of boolean', () => {
      assert.strictEqual(typeof isNormalized('2d6+5'), 'boolean');
    });
  });

  describe('test edge cases', () => {
    it('captures uppercase', () => {
      assert.strictEqual(isNormalized('D20'), false);
    });

    it('captures space at the start', () => {
      assert.strictEqual(isNormalized(' d4'), false);
    });

    it('captures spaces in between', () => {
      assert.strictEqual(isNormalized('d6 + d4'), false);
    });

    it('captures space at the end', () => {
      assert.strictEqual(isNormalized('d4 '), false);
    });

    it('captures d1', () => {
      assert.strictEqual(isNormalized('1d1'), false);
    });

    it('captures 1dN at the start', () => {
      assert.strictEqual(isNormalized('1d6'), false);
    });

    it('passes N1dN at the start', () => {
      assert.strictEqual(isNormalized('11d6'), true);
    });

    it('captures 1dN in between', () => {
      assert.strictEqual(isNormalized('d8+1d6'), false);
    });

    it('passes N1dN in between', () => {
      assert.strictEqual(isNormalized('d8+11d6'), true);
    });

    it('captures negative dice without modifier', () => {
      assert.strictEqual(isNormalized('-d6'), false);
    });

    it('captures negative dice with modifier', () => {
      assert.strictEqual(isNormalized('d12-2d6'), false);
    });

    it('captures unsorted dice', () => {
      assert.strictEqual(isNormalized('d4+d6'), false);
    });

    it('captures unsorted dice and modifier', () => {
      assert.strictEqual(isNormalized('1+d4'), false);
    });

    it('captures ungroupped dice', () => {
      assert.strictEqual(isNormalized('d4+d4'), false);
    });

    it('passes normalized notation', () => {
      assert.strictEqual(isNormalized('2d6-1'), true);
    });

    it('throws an error on invalid exression passed', () => {
      assert.throws(() => {
        isNormalized('2d');
      });
    });
  });
});
