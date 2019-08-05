import assert from 'assert';
import isNormalized from './isNormalized.js';

describe('isNormalized', function() {
  describe('returns a boolean', function() {
    it('returns result type of boolean', function() {
      assert.strictEqual(typeof isNormalized('2d6+5'), 'boolean');
    });
  });

  describe('test edge cases', function() {
    it('captures uppercase', function() {
      assert.strictEqual(isNormalized('D20'), false);
    });

    it('captures space at the start', function() {
      assert.strictEqual(isNormalized(' d4'), false);
    });

    it('captures spaces in between', function() {
      assert.strictEqual(isNormalized('d6 + d4'), false);
    });

    it('captures space at the end', function() {
      assert.strictEqual(isNormalized('d4 '), false);
    });

    it('captures d1', function() {
      assert.strictEqual(isNormalized('1d1'), false);
    });

    it('captures 1dN at the start', function() {
      assert.strictEqual(isNormalized('1d6'), false);
    });

    it('passes N1dN at the start', function() {
      assert.strictEqual(isNormalized('11d6'), true);
    });

    it('captures 1dN in between', function() {
      assert.strictEqual(isNormalized('d8+1d6'), false);
    });

    it('passes N1dN in between', function() {
      assert.strictEqual(isNormalized('d8+11d6'), true);
    });

    it('captures negative dice without modifier', function() {
      assert.strictEqual(isNormalized('-d6'), false);
    });

    it('captures negative dice with modifier', function() {
      assert.strictEqual(isNormalized('d12-2d6'), false);
    });

    it('captures unsorted dice', function() {
      assert.strictEqual(isNormalized('d4+d6'), false);
    });

    it('captures unsorted dice and modifier', function() {
      assert.strictEqual(isNormalized('1+d4'), false);
    });

    it('captures ungroupped dice', function() {
      assert.strictEqual(isNormalized('d4+d4'), false);
    });

    it('passes normalized notation', function() {
      assert.strictEqual(isNormalized('2d6-1'), true);
    });

    it('throws an error on invalid exression passed', function() {
      assert.throws(function() {
        normalize('2d');
      });
    });
  });
});
