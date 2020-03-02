import assert from 'assert';
import Dice from '../../types/Dice.js';
import minDice from '../minDice.js';

describe('minDice', () => {
  describe('returns a number', () => {
    it('returns result type of number', () => {
      const dice = [new Dice({ count: 1, side: 12 }), new Dice({ count: 4, side: 6 }), new Dice({ count: 5, side: 1 })];
      assert.strictEqual(typeof minDice(dice), 'number');
    });
  });

  describe('works correctly with positive', () => {
    it('minDice 2d6+5 = 7', () => {
      const dice = [new Dice({ count: 2, side: 6 }), new Dice({ count: 5, side: 1 })];
      assert.strictEqual(minDice(dice), 7);
    });
  });

  describe('works correctly with negative', () => {
    it('minDice d12-d6 = -5', () => {
      const dice = [new Dice({ count: 1, side: 12 }), new Dice({ count: -1, side: 6 })];
      assert.strictEqual(minDice(dice), -5);
    });
  });
});
