import assert from 'assert';
import rollDiceArray from '@/core/rollDiceArray.js';
import isDetailed from '@/utils/isDetailed.js';
import isResult from '@/utils/isResult.js';

describe('rollDiceArray', () => {
  describe('returns a number', () => {
    const dice = [
      { count: 2, side: 12 },
      { count: 3, side: 6 },
      { count: 5, side: 1 },
    ];
    const result = rollDiceArray(dice);

    it('returns result type of number', () => {
      assert.strictEqual(typeof result, 'number');
    });

    it('result of rollDiceArray 2d12+3d6+5 is between 10 and 47', () => {
      const isInRange = 10 <= result && result <= 47;
      assert.strictEqual(isInRange, true);
    });

    const detailedResult = rollDiceArray(dice, true);
    it('returns result type of Detailed if flag given', () => {
      assert.strictEqual(isDetailed(detailedResult), true);
    });

    const allRollsAreResults = detailedResult.rolls.every(rollDiceArray => rollDiceArray.every(isResult));
    it('all resulting rolls are type of Result', () => {
      assert.strictEqual(allRollsAreResults, true);
    });

    it('detailed rolls 2d12+3d6+5 length = 3, count of dice notation parts', () => {
      assert.strictEqual(detailedResult.rolls.length, 3);
    });

    const [d12s, d6s, flat] = detailedResult.rolls;
    it('each rolls 2d12+3d6+5 part length is equal to count of notation (2, 3, 1)', () => {
      assert.strictEqual(d12s.length, 2);
      assert.strictEqual(d6s.length, 3);
      assert.strictEqual(flat.length, 1);
    });
  });

  describe('1000 d20 rolls', () => {
    const rolls = [];
    for (let i = 0; i < 1000; i++) {
      rolls.push(rollDiceArray([{ count: 1, side: 20 }]));
    }
    // An integer in range
    const isValidResult = x => typeof x === 'number' && Math.round(x) === x && 1 <= x && x <= 20;
    it('every result in range 1..20', () => {
      assert.strictEqual(rolls.every(isValidResult), true);
    });
  });
});
