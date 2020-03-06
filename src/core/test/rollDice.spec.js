import assert from 'assert';
import rollDice from '@/core/rollDice.js';
import isResult from '@/utils/isResult';

describe('rollDice', () => {
  describe('test if side = 1, count = 6', () => {
    const result = rollDice({ count: 6, side: 1 });

    it('returns result type of Result', () => {
      assert.strictEqual(isResult(result), true);
    });

    const { side, rolled } = result;
    it('returns side = 1', () => {
      assert.strictEqual(side, 1);
    });

    it('returns rolled first result is 6', () => {
      assert.strictEqual(rolled[0], 6);
    });
  });

  describe('test if side = 1 and negative count -2', () => {
    const result = rollDice({ count: -2, side: 1 });
    it('returns result type of Result', () => {
      assert.strictEqual(isResult(result), true);
    });

    const { side, rolled } = result;
    it('returns side = 1', () => {
      assert.strictEqual(side, 1);
    });

    it('returns rolled first result is-2', () => {
      assert.strictEqual(rolled[0], -2);
    });
  });

  describe('test roll positive count 65 and side = 8', () => {
    const result = rollDice({ count: 65, side: 8 });

    it('returns result type of Result', () => {
      assert.strictEqual(isResult(result), true);
    });

    const { side, rolled } = result;
    it('returns side = 8', () => {
      assert.strictEqual(side, 8);
    });

    const length = rolled.length;
    it('rolled array length = count 65', () => {
      assert.strictEqual(length, 65);
    });

    it('positive count causes every result is between 1 and 8', () => {
      const resultsInRange = rolled.every(result => 1 <= result && result <= 8);
      assert.strictEqual(resultsInRange, true);
    });
  });

  describe('test roll negative count -100 and side = 6', () => {
    const result = rollDice({ count: -100, side: 6 });
    it('returns result type of Result', () => {
      assert.strictEqual(isResult(result), true);
    });

    const { side, rolled } = result;
    it('returns side = 6', () => {
      assert.strictEqual(side, 6);
    });

    const length = rolled.length;
    it('result array length = count modulo 100', () => {
      assert.strictEqual(length, 100);
    });

    it('negative count causes every result is between -6 and -1', () => {
      const resultsInRange = rolled.every(result => -6 <= result && result <= -1);
      assert.strictEqual(resultsInRange, true);
    });
  });
});
