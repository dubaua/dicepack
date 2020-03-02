import assert from 'assert';
import Dice from '../../types/Dice.js';
import maxDice from '../maxDice.js';

describe('maxDice', () => {
  describe('returns a number', () => {
    it('returns result type of number', () => {
      const dice = [new Dice({ count: 1, side: 12 }), new Dice({ count: 4, side: 6 }), new Dice({ count: 5, side: 1 })];
      assert.strictEqual(typeof maxDice(dice), 'number');
    });
  });

  describe('works correctly with positive', () => {
    it('maxDice d12+4d6+5 = 41', () => {
      const dice = [new Dice({ count: 1, side: 12 }), new Dice({ count: 4, side: 6 }), new Dice({ count: 5, side: 1 })];
      assert.strictEqual(maxDice(dice), 41);
    });
  });

  describe('works correctly with negative', () => {
    it('maxDice d12-d6 = 11', () => {
      const dice = [new Dice({ count: 1, side: 12 }), new Dice({ count: -1, side: 6 })];
      assert.strictEqual(maxDice(dice), 11);
    });
  });
});
