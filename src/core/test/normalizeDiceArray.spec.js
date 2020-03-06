import assert from 'assert';
import normalizeDiceArray from '@/core/normalizeDiceArray.js';
import isDice from '@/utils/isDice.js';

describe('normalizeDiceArray', () => {
  describe('returns a array of Dice', () => {
    it('each array element is Dice', () => {
      const normalized = normalizeDiceArray([
        { count: 1, side: 6 },
        { count: 1, side: 6 },
      ]);
      const eachInstanceOfDice = normalized.every(isDice);
      assert.strictEqual(eachInstanceOfDice, true);
    });
  });

  describe('group same side dice', () => {
    it('d6+d4+2d6 deep equal to 3d6+d4', () => {
      const normalized = normalizeDiceArray([
        { count: 1, side: 6 },
        { count: 1, side: 4 },
        { count: 2, side: 6 },
      ]);
      const expected = [
        { count: 3, side: 6 },
        { count: 1, side: 4 },
      ];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('order dice by side', () => {
    it('d12+d8+d10+d4+1+d6+d20 deep equal to d20+d12+d10+d8+d6+d4+1', () => {
      const normalized = normalizeDiceArray([
        { count: 1, side: 12 },
        { count: 1, side: 8 },
        { count: 1, side: 10 },
        { count: 1, side: 4 },
        { count: 1, side: 1 },
        { count: 1, side: 6 },
        { count: 1, side: 20 },
      ]);
      const expected = [
        { count: 1, side: 20 },
        { count: 1, side: 12 },
        { count: 1, side: 10 },
        { count: 1, side: 8 },
        { count: 1, side: 6 },
        { count: 1, side: 4 },
        { count: 1, side: 1 },
      ];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('convert negative dice to positive with negative modifier', () => {
    it('-d6 deep equal to d6-7', () => {
      const normalized = normalizeDiceArray([{ count: -1, side: 6 }]);
      const expected = [
        { count: 1, side: 6 },
        { count: -7, side: 1 },
      ];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('sum modifiers', () => {
    it('-d6+2+3 deep equal to d6-2', () => {
      const normalized = normalizeDiceArray([
        { count: -1, side: 6 },
        { count: 2, side: 1 },
        { count: 3, side: 1 },
      ]);
      const expected = [
        { count: 1, side: 6 },
        { count: -2, side: 1 },
      ];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('drop 0 modifiers', () => {
    it('-d6+7 deep equal to d6', () => {
      const normalized = normalizeDiceArray([
        { count: -1, side: 6 },
        { count: 7, side: 1 },
      ]);
      const expected = [{ count: 1, side: 6 }];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('drop dice if calclutated to single modifier', () => {
    it('d1-d1 deep equal to empty array', () => {
      const normalized = normalizeDiceArray([
        { count: 1, side: 1 },
        { count: -1, side: 1 },
      ]);
      const expected = [];
      assert.deepEqual(normalized, expected);
    });
  });

  // TODO zero cases, all normalize cases
});
