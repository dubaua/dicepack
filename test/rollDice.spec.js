import assert from 'assert';
import { rollDice } from '../index.js';

describe('rollDice', function() {
  describe('returns a number', function() {
    const result = rollDice([{ count: 2, side: 12 }, { count: 3, side: 6 }, { count: 5, side: 1 }]);
    const typeofResult = typeof result;
    it('returns result type of number', function() {
      assert.strictEqual(typeofResult, 'number');
    });
  });

  describe('result is in range', function() {
    const result = rollDice([{ count: 2, side: 12 }, { count: 3, side: 6 }, { count: 5, side: 1 }]);
    const isInRange = 10 <= result && result <= 47;
    it('result of roll 2d12+3d6+5 config is between 10 and 47', function() {
      assert.strictEqual(isInRange, true);
    });
  });

  describe('returns detailed results if detailed flag given', function() {
    const result = rollDice([{ count: 2, side: 12 }, { count: 3, side: 6 }, { count: 5, side: 1 }], true);
    const isDetailed = function(result) {
      return (
        result.hasOwnProperty('result') &&
        result.hasOwnProperty('rolls') &&
        typeof result.result === 'number' &&
        Array.isArray(result.rolls)
      );
    };
    it('returns result type of detailed', function() {
      assert.strictEqual(isDetailed(result), true);
    });
  });

  describe('1000 d20 config rolls', function() {
    let rolls = [];
    for (let i = 0; i < 1000; i++) {
      rolls.push(rollDice([{ count: 1, side: 20 }]));
    }
    const everyInRange = rolls.every(result => 1 <= result && result <= 20);
    it('every result in range 1..20', function() {
      assert.strictEqual(everyInRange, true);
    });
  });
});
