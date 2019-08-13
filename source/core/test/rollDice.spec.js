import assert from 'assert';
import Result from '../../types/Result.js';
import Detailed from '../../types/Detailed.js';
import rollDice from '../rollDice.js';
import Dice from '../../types/Dice.js';

describe('rollDice', function() {
  describe('returns a number', function() {
    const dice = [new Dice({ count: 2, side: 12 }), new Dice({ count: 3, side: 6 }), new Dice({ count: 5, side: 1 })];
    const result = rollDice(dice);

    it('returns result type of number', function() {
      assert.strictEqual(typeof result, 'number');
    });

    it('result of rollDice 2d12+3d6+5 is between 10 and 47', function() {
      const isInRange = 10 <= result && result <= 47;
      assert.strictEqual(isInRange, true);
    });

    const detailedResult = rollDice(dice, true);
    it('returns result type of Detailed if flag given', function() {
      assert.strictEqual(detailedResult instanceof Detailed, true);
    });

    const allRollsAreResults = detailedResult.rolls.every(rollDice =>
      rollDice.every(result => result instanceof Result)
    );
    it('all resulting rolls are type of Result', function() {
      assert.strictEqual(allRollsAreResults, true);
    });

    it('detailed rolls 2d12+3d6+5 length = 3, count of dice notation parts', function() {
      assert.strictEqual(detailedResult.rolls.length, 3);
    });

    const [d12s, d6s, flat] = detailedResult.rolls;
    it('each rolls 2d12+3d6+5 part length is equal to count of notation (2, 3, 1)', function() {
      assert.strictEqual(d12s.length, 2);
      assert.strictEqual(d6s.length, 3);
      assert.strictEqual(flat.length, 1);
    });
  });

  describe('1000 d20 rolls', function() {
    let rolls = [];
    for (let i = 0; i < 1000; i++) {
      rolls.push(rollDice([new Dice({ count: 1, side: 20 })]));
    }
    // An integer in range
    const isValidResult = x => typeof x === 'number' && Math.round(x) === x && 1 <= x && x <= 20;
    it('every result in range 1..20', function() {
      assert.strictEqual(rolls.every(isValidResult), true);
    });
  });
});
