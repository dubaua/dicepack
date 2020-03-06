import assert from 'assert';
import rollDiceArray from '@/core/rollDiceArray.js';
import isDetailed from '@/utils/isDetailed.js';

describe('rollDiceArray', () => {
  describe('returns a number', () => {
    const dice = [
      { count: 2, side: 12 },
      { count: 3, side: 6 },
      { count: 5, side: 1 },
    ];
    const result = rollDiceArray(dice);

    it('returns result type of Detailed', () => {
      assert.strictEqual(isDetailed(result), true);
    });

    const { total, results } = result;

    it('result of rollDiceArray 2d12+3d6+5 is between 10 and 47', () => {
      const isInRange = 10 <= total && total <= 47;
      assert.strictEqual(isInRange, true);
    });

    it('detailed rolls 2d12+3d6+5 length = 3, count of dice notation parts', () => {
      assert.strictEqual(results.length, 3);
    });

    const [d12s, d6s, flat] = results;
    it('each rolls 2d12+3d6+5 part side is equal to side of notation (12, 6, 1)', () => {
      assert.strictEqual(d12s.side, 12);
      assert.strictEqual(d6s.side, 6);
      assert.strictEqual(flat.side, 1);
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
      assert.strictEqual(
        rolls.every(({ total }) => isValidResult(total)),
        true,
      );
    });
  });
});
