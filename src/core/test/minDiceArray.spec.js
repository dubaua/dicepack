import assert from 'assert';
import minDiceArray from '@/core/minDiceArray.js';

describe('minDiceArray', () => {
  describe('returns a number', () => {
    it('returns result type of number', () => {
      const dice = [
        { count: 1, side: 12 },
        { count: 4, side: 6 },
        { count: 5, side: 1 },
      ];
      assert.strictEqual(typeof minDiceArray(dice), 'number');
    });
  });

  describe('works correctly with positive', () => {
    it('minDiceArray 2d6+5 = 7', () => {
      const dice = [
        { count: 2, side: 6 },
        { count: 5, side: 1 },
      ];
      assert.strictEqual(minDiceArray(dice), 7);
    });
  });

  describe('works correctly with negative', () => {
    it('minDiceArray d12-d6 = -5', () => {
      const dice = [
        { count: 1, side: 12 },
        { count: -1, side: 6 },
      ];
      assert.strictEqual(minDiceArray(dice), -5);
    });
  });
});
