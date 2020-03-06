import assert from 'assert';
import getDice from '@/core/getDice.js';
import isDice from '@/utils/isDice.js';

describe('getDice', () => {
  describe('test edge cases', () => {
    it('returns result type of Dice', () => {
      assert.strictEqual(isDice(getDice('d4')), true);
    });

    it('works properly with dropped count', () => {
      const { count, side } = getDice('d4');
      assert.strictEqual(count, 1);
      assert.strictEqual(side, 4);
    });

    it('works properly with dropped negative count', () => {
      const { count, side } = getDice('-d6');
      assert.strictEqual(count, -1);
      assert.strictEqual(side, 6);
    });

    it('works properly with flat numbers', () => {
      const { count, side } = getDice('12');
      assert.strictEqual(count, 12);
      assert.strictEqual(side, 1);
    });

    it('works properly with negative flat numbers', () => {
      const { count, side } = getDice('-3');
      assert.strictEqual(count, -3);
      assert.strictEqual(side, 1);
    });

    it('leading zero properly dropped', () => {
      const { count, side } = getDice('02d4');
      assert.strictEqual(count, 2);
      assert.strictEqual(side, 4);
    });

    it('leading zero with negatives properly dropped', () => {
      const { count, side } = getDice('-03d6');
      assert.strictEqual(count, -3);
      assert.strictEqual(side, 6);
    });

    it('zero on side notation properly dropped', () => {
      const { count, side } = getDice('d04');
      assert.strictEqual(count, 1);
      assert.strictEqual(side, 4);
    });
  });

  describe('test random 1000 valid user input', () => {
    const getRandomInt = max => Math.floor(Math.random() * max) + 1;

    const takeRandom = function(...items) {
      return items[getRandomInt(items.length) - 1];
    };

    const results = [];

    for (let test = 0; test < 1000; test++) {
      // randomize new dice
      const randomDice = {
        count: takeRandom(1, -1) * getRandomInt(10),
        side: takeRandom(1, 4, 6, 8, 10, 12, 20, 100),
      };

      // collecting notation parts
      let side = `d${randomDice.side}`;
      if (randomDice.side === 1) {
        side = takeRandom(side, ''); // drop some d1's
      }
      let count = randomDice.count;
      if (randomDice.count === 1) {
        count = takeRandom(count, ''); // drop some 1d's
      }
      if (side === '') {
        count = randomDice.count; // restore count in case of dropped d1
      }

      // glue notation
      const notation = `${count}${side}`;

      // testing
      const resultDice = getDice(`${notation}`);
      const resultIsCorrect = resultDice.count === randomDice.count && resultDice.side === randomDice.side;

      // collecting
      results.push(resultIsCorrect);
    }
    // comparing
    const everyIsCorrect = results.every(result => result === true);
    it('1000 tests executed', () => {
      assert.strictEqual(results.length, 1000);
    });
    it('each result is correct', () => {
      assert.strictEqual(everyIsCorrect, true);
    });
  });

  describe('test error cases', () => {
    const errorExpressions = [
      'd',
      '-d',
      'd-',
      '-',
      '',
      '1d',
      '-1d',
      '1d-',
      '1-d',
      'd-1',
      'd-d',
      '1-1',
      '-d-',
      '-1-',
      '.1d1',
      '1.d1',
      '1d.1',
      '1d1.',
      '.11d1',
      '1.1d1',
      '11.d1',
      '1d1.1',
      '1d11.',
      true,
      false,
      1,
      0,
    ];
    for (let i = 0; i < errorExpressions.length; i++) {
      const wrongNotation = errorExpressions[i];
      it(`${wrongNotation} => throws an error`, () => {
        assert.throws(() => {
          getDice(wrongNotation);
        });
      });
    }
  });
});
