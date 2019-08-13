import assert from 'assert';
import Dice from '../../types/Dice.js';
import rollDie from '../rollDie.js';

describe('rollDie', function() {
  describe('test if side = 1, count = 6', function() {
    const result = rollDie(new Dice({ count: 6, side: 1 }));
    const isArray = Array.isArray(result);
    it('returns result type of array', function() {
      assert.strictEqual(isArray, true);
    });

    const length = result.length;
    it('array length = 1', function() {
      assert.strictEqual(length, 1);
    });

    const resultValue = result[0];
    it('returns count = 6', function() {
      assert.strictEqual(resultValue, 6);
    });
  });

  describe('test if side = 1 and negative count -2', function() {
    const result = rollDie(new Dice({ count: -2, side: 1 }));
    const isArray = Array.isArray(result);
    it('returns result type of array', function() {
      assert.strictEqual(isArray, true);
    });

    const length = result.length;
    it('array length = 1', function() {
      assert.strictEqual(length, 1);
    });

    const resultValue = result[0];
    it('returns count = -2', function() {
      assert.strictEqual(resultValue, -2);
    });
  });

  describe('test roll positive count 65 and side = 8', function() {
    const result = rollDie(new Dice({ count: 65, side: 8 }));
    const isArray = Array.isArray(result);
    it('returns  result type of array', function() {
      assert.strictEqual(isArray, true);
    });

    const length = result.length;
    it('result array length = count 65', function() {
      assert.strictEqual(length, 65);
    });

    it('positive count causes every result is between 1 and 8', function() {
      const resultsInRange = result.every(result => 1 <= result && result <= 8);
      assert.strictEqual(resultsInRange, true);
    });
  });

  describe('test roll negative count -100 and side = 6', function() {
    const result = rollDie(new Dice({ count: -100, side: 6 }));
    const isArray = Array.isArray(result);
    it('returns result type of array', function() {
      assert.strictEqual(isArray, true);
    });

    const length = result.length;
    it('result array length = count modulo 100', function() {
      assert.strictEqual(length, 100);
    });

    it('negative count causes every result is between -6 and -1', function() {
      const resultsInRange = result.every(result => -6 <= result && result <= -1);
      assert.strictEqual(resultsInRange, true);
    });
  });
});
