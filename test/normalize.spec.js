import assert from 'assert';
import { normalize } from '../index.js';

describe('normalize', function() {
  describe('returns a string', function() {
    it('returns result type of string', function() {
      assert.strictEqual(typeof normalize('2d6+5'), 'string');
    });
  });

  describe('test edge cases', function() {
    it('trim spaces d12 + d8 => d12+d8', function() {
      assert.strictEqual(normalize('d12 + d8'), 'd12+d8');
    });

    it('lowercase 2D12+3 => 2d12+3', function() {
      assert.strictEqual(normalize('2D12+3'), '2d12+3');
    });

    it('group same side dice d6+d4+2d6 => 3d6+d4', function() {
      assert.strictEqual(normalize('d6+d4+2d6'), '3d6+d4');
    });

    it('order dice by side d12+d8+d10+d4+d6+d20 => d20+d12+d10+d8+d6+d4', function() {
      assert.strictEqual(normalize('d12+d8+d10+d4+d6+d20'), 'd20+d12+d10+d8+d6+d4');
    });

    it('remove 1 before 1dN 1d6 => d6', function() {
      assert.strictEqual(normalize('1d6'), 'd6');
    });

    it('convert Nd1 to N 5d1 => 5', function() {
      assert.strictEqual(normalize('5d1'), '5');
    });

    it('convert negative dice to positive with negative modifier -d6 => d6-7', function() {
      assert.strictEqual(normalize('-d6'), 'd6-7');
    });

    it('throws an error on invalid exression passed', function() {
      assert.throws(function() {
        normalize('2d');
      });
    });
  });

  describe('Test some examples', function() {
    it('d4 + D4+1d4    + d4 => 4d4', function() {
      assert.strictEqual(normalize('d4 + D4+1d4    + d4'), '4d4');
    });

    it('d6-d6-d6   => 3d6-14', function() {
      assert.strictEqual(normalize('d6-d6-d6  '), '3d6-14');
    });

    it('1d1 => 1', function() {
      assert.strictEqual(normalize('1d1'), '1');
    });

    it('-1d1 => -1', function() {
      assert.strictEqual(normalize('-1d1'), '-1');
    });

    it('1d1-1d1 => 0', function() {
      assert.strictEqual(normalize('1d1-1d1'), '0');
    });
  });
});
