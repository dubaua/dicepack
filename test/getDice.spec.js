import assert from 'assert';
import { getDice } from '../index.js';

describe('getDice', function() {
  describe('test edge cases', function() {
    describe('works properly with dropped multiplier = 1', function() {
      it('d4 => { multiplier: 1, side: 4 }', function() {
        const { multiplier, side } = getDice('d4');
        assert.equal(multiplier, 1);
        assert.equal(side, 4);
      });
    });

    describe('works properly with dropped multiplier = -1', function() {
      it('-d6 => { multiplier: -1, side: 6 }', function() {
        const { multiplier, side } = getDice('-d6');
        assert.equal(multiplier, -1);
        assert.equal(side, 6);
      });
    });

    describe('works properly with numbers', function() {
      it('12 => { multiplier: 12, side: 1 }', function() {
        const { multiplier, side } = getDice('12');
        assert.equal(multiplier, 12);
        assert.equal(side, 1);
      });
    });

    describe('works properly with negative numbers', function() {
      it('-3 => { multiplier: -3, side: 1 }', function() {
        const { multiplier, side } = getDice('-3');
        assert.equal(multiplier, -3);
        assert.equal(side, 1);
      });
    });

    describe('correctly process zero sides', function() {
      it('-d0 => { multiplier: -1, side: 0 }', function() {
        const { multiplier, side } = getDice('-d0');
        assert.equal(multiplier, -1);
        assert.equal(side, 0);
      });
    });

    describe('correctly process zero number', function() {
      it('0 => { multiplier: 0, side: 1 }', function() {
        const { multiplier, side } = getDice('0');
        assert.equal(multiplier, 0);
        assert.equal(side, 1);
      });
    });

    describe('negative zero transforms to zero', function() {
      it('-0 => { multiplier: 0, side: 1 }', function() {
        const { multiplier, side } = getDice('-0');
        assert.equal(multiplier, 0);
        assert.equal(side, 1);
      });
    });

    describe('nonsense, but notation correct', function() {
      it('0d0 => { multiplier: 0, side: 0 }', function() {
        const { multiplier, side } = getDice('0d0');
        assert.equal(multiplier, 0);
        assert.equal(side, 0);
      });
    });

    describe('nonsense, but notation correct', function() {
      it('-0d0 => { multiplier: 0, side: 0 }', function() {
        const { multiplier, side } = getDice('-0d0');
        assert.equal(multiplier, 0);
        assert.equal(side, 0);
      });
    });

    describe('leading zero properly dropped', function() {
      it('02d4 => { multiplier: 2, side: 4 }', function() {
        const { multiplier, side } = getDice('02d4');
        assert.equal(multiplier, 2);
        assert.equal(side, 4);
      });
    });

    describe('leading zero with negatives properly dropped', function() {
      it('-03d6 => { multiplier: -3, side: 6 }', function() {
        const { multiplier, side } = getDice('-03d6');
        assert.equal(multiplier, -3);
        assert.equal(side, 6);
      });
    });

    describe('zero on side notation properly dropped', function() {
      it('d04 => { multiplier: 1, side: 4 }', function() {
        const { multiplier, side } = getDice('d04');
        assert.equal(multiplier, 1);
        assert.equal(side, 4);
      });
    });

    describe('zero on negative side notation throws an error', function() {
      it('d0-4 => error', function() {
        assert.throws(function() {
          getDice('d0-4');
        });
      });
    });
  });

  describe(`test random 50 valid user input`, function() {
    const getRandomInt = max => Math.floor(Math.random() * max) + 1;

    const takeRandom = function(...items) {
      return items[getRandomInt(items.length) - 1];
    };

    for (let test = 0; test < 50; test++) {
      // randomize new dice
      const randomDice = {
        multiplier: takeRandom(1, -1) * getRandomInt(11) - 1,
        side: takeRandom(0, 1, 4, 6, 8, 10, 12, 20, 100),
      };

      // collecting notation parts
      let side = `d${randomDice.side}`;
      if (randomDice.side === 1) {
        side = takeRandom(side, ''); // drop some d1's
      }
      let multiplier = randomDice.multiplier;
      if (randomDice.multiplier === 1) {
        multiplier = takeRandom(multiplier, ''); // drop some 1d's
      }
      if (side === '') {
        multiplier = randomDice.multiplier; // restore multiplier in case of dropped d1
      }

      // glue notation
      const notation = `${multiplier}${side}`;

      it(`${notation} => { multiplier: ${randomDice.multiplier}, side: ${randomDice.side} }`, function() {
        const resultDice = getDice(`${notation}`);
        assert.equal(resultDice.multiplier, randomDice.multiplier);
        assert.equal(resultDice.side, randomDice.side);
      });
    }
  });

  describe('test error cases', function() {
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
    ];
    for (let i = 0; i < errorExpressions.length; i++) {
      const wrongNotation = errorExpressions[i];
      it(`"${wrongNotation}" => throws error`, function() {
        assert.throws(function() {
          getDice(wrongNotation);
        });
      });
    }
  });
});
