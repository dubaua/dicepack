import assert from 'assert';
import Dice from '../../types/Dice.js';
import maxDice from '../maxDice.js';

describe('maxDice', function() {
  describe('returns a number', function() {
    it('returns result type of number', function() {
      const dice = [
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: 4, side: 6 }),
        new Dice({ count: 5, side: 1 }),
      ];
      assert.strictEqual(typeof maxDice(dice), 'number');
    });
  });

  describe('works correctly with positive', function() {
    it('maxDice d12+4d6+5 = 41', function() {
      const dice = [
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: 4, side: 6 }),
        new Dice({ count: 5, side: 1 }),
      ];
      assert.strictEqual(maxDice(dice), 41);
    });
  });

  describe('works correctly with negative', function() {
    it('maxDice d12-d6 = 11', function() {
      const dice = [
        new Dice({ count: 1, side: 12 }),
        new Dice({ count: -1, side: 6 }),
      ];
      assert.strictEqual(maxDice(dice), 11);
    });
  });
});
