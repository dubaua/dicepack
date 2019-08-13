import assert from 'assert';
import Dice from '../../types/Dice.js';
import minDice from '../minDice.js';

describe('minDice', function() {
  describe('returns a number', function() {
    it('returns result type of number', function() {
      const dice = [
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: 4, side: 6 }),
        new Dice({ count: 5, side: 1 }),
      ];
      assert.strictEqual(typeof minDice(dice), 'number');
    });
  });

  describe('works correctly with positive', function() {
    it('minDice 2d6+5 = 7', function() {
      const dice = [
        new Dice({ count: 2, side: 6 }),
        new Dice({ count: 5, side: 1 }),
      ];
      assert.strictEqual(minDice(dice), 7);
    });
  });

  describe('works correctly with negative', function() {
    it('minDice d12-d6 = -5', function() {
      const dice = [
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: -1, side: 6 }),
      ];
      assert.strictEqual(minDice(dice), -5);
    });
  });
});
