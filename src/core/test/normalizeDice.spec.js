import assert from 'assert';
import Dice from '../../types/Dice.js';
import normalizeDice from '../normalizeDice.js';

describe('normalizeDice', () => {
  describe('returns a array of Dice', () => {
    it('each array element is instancse of Dice', () => {
      const normalized = normalizeDice([new Dice({ count: 1, side: 6 }), new Dice({ count: 1, side: 6 })]);
      const eachInstanceOfDice = normalized.every(element => element instanceof Dice);
      assert.strictEqual(eachInstanceOfDice, true);
    });
  });

  describe('group same side dice', () => {
    it('d6+d4+2d6 deep equal to 3d6+d4', () => {
      const normalized = normalizeDice([
        new Dice({ count: 1, side: 6 }),
        new Dice({ count: 1, side: 4 }),
        new Dice({ count: 2, side: 6 }),
      ]);
      const expected = [new Dice({ count: 3, side: 6 }), new Dice({ count: 1, side: 4 })];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('order dice by side', () => {
    it('d12+d8+d10+d4+1+d6+d20 deep equal to d20+d12+d10+d8+d6+d4+1', () => {
      const normalized = normalizeDice([
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: 1, side: 8 }),
        new Dice({ count: 1, side: 10 }),
        new Dice({ count: 1, side: 4 }),
        new Dice({ count: 1, side: 1 }),
        new Dice({ count: 1, side: 6 }),
        new Dice({ count: 1, side: 20 }),
      ]);
      const expected = [
        new Dice({ count: 1, side: 20 }),
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: 1, side: 10 }),
        new Dice({ count: 1, side: 8 }),
        new Dice({ count: 1, side: 6 }),
        new Dice({ count: 1, side: 4 }),
        new Dice({ count: 1, side: 1 }),
      ];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('convert negative dice to positive with negative modifier', () => {
    it('-d6 deep equal to d6-7', () => {
      const normalized = normalizeDice([new Dice({ count: -1, side: 6 })]);
      const expected = [new Dice({ count: 1, side: 6 }), new Dice({ count: -7, side: 1 })];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('sum modifiers', () => {
    it('-d6+2+3 deep equal to d6-2', () => {
      const normalized = normalizeDice([
        new Dice({ count: -1, side: 6 }),
        new Dice({ count: 2, side: 1 }),
        new Dice({ count: 3, side: 1 }),
      ]);
      const expected = [new Dice({ count: 1, side: 6 }), new Dice({ count: -2, side: 1 })];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('drop 0 modifiers', () => {
    it('-d6+7 deep equal to d6', () => {
      const normalized = normalizeDice([new Dice({ count: -1, side: 6 }), new Dice({ count: 7, side: 1 })]);
      const expected = [new Dice({ count: 1, side: 6 })];
      assert.deepEqual(normalized, expected);
    });
  });

  describe('drop dice if calclutated to single modifier', () => {
    it('d1-d1 deep equal to empty array', () => {
      const normalized = normalizeDice([new Dice({ count: 1, side: 1 }), new Dice({ count: -1, side: 1 })]);
      const expected = [];
      assert.deepEqual(normalized, expected);
    });
  });
});
