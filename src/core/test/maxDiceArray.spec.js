import assert from 'assert';
import maxDiceArray from '@/core/maxDiceArray.js';

describe('maxDiceArray', () => {
  describe('returns a number', () => {
    it('returns result type of number', () => {
      const dice = [
        { count: 1, side: 12 },
        { count: 4, side: 6 },
        { count: 5, side: 1 },
      ];
      assert.strictEqual(typeof maxDiceArray(dice), 'number');
    });
  });

  describe('works correctly with positive', () => {
    it('maxDiceArray d12+4d6+5 = 41', () => {
      const dice = [
        { count: 1, side: 12 },
        { count: 4, side: 6 },
        { count: 5, side: 1 },
      ];
      assert.strictEqual(maxDiceArray(dice), 41);
    });
  });

  describe('works correctly with negative', () => {
    it('maxDiceArray d12-d6 = 11', () => {
      const dice = [
        { count: 1, side: 12 },
        { count: -1, side: 6 },
      ];
      assert.strictEqual(maxDiceArray(dice), 11);
    });
  });
});
