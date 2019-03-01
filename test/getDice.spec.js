import assert from 'assert';
import { getDice } from '../index.js';

describe('getDice', function() {
  describe('test edge cases', function() {
    it('  d4 => { count: 1, side: 4, sign:  1 }', function() {
      const { count, side, sign } = getDice('d4');
      assert.equal(count, 1);
      assert.equal(side, 4);
      assert.equal(sign, 1);
    });

    it(' -d4 => { count: 1, side: 4, sign: -1 }', function() {
      const { count, side, sign } = getDice('-d4');
      assert.equal(count, 1);
      assert.equal(side, 4);
      assert.equal(sign, -1);
    });

    it('   4 => { count: 4, side: 1, sign:  1 }', function() {
      const { count, side, sign } = getDice('4');
      assert.equal(count, 4);
      assert.equal(side, 1);
      assert.equal(sign, 1);
    });

    it('  -4 => { count: 4, side: 1, sign: -1 }', function() {
      const { count, side, sign } = getDice('-4');
      assert.equal(count, 4);
      assert.equal(side, 1);
      assert.equal(sign, -1);
    });

    it('  d0 => { count: 1, side: 0, sign:  1 }', function() {
      const { count, side, sign } = getDice('d0');
      assert.equal(count, 1);
      assert.equal(side, 0);
      assert.equal(sign, 1);
    });

    it(' -d0 => { count: 1, side: 0, sign: -1 }', function() {
      const { count, side, sign } = getDice('-d0');
      assert.equal(count, 1);
      assert.equal(side, 0);
      assert.equal(sign, -1);
    });

    it('   0 => { count: 0, side: 1, sign:  1 }', function() {
      const { count, side, sign } = getDice('0');
      assert.equal(count, 0);
      assert.equal(side, 1);
      assert.equal(sign, 1);
    });

    it('  -0 => { count: 0, side: 1, sign: -1 }', function() {
      const { count, side, sign } = getDice('-0');
      assert.equal(count, 0);
      assert.equal(side, 1);
      assert.equal(sign, -1);
    });

    it(' 0d0 => { count: 0, side: 0, sign:  1 }', function() {
      const { count, side, sign } = getDice('0d0');
      assert.equal(count, 0);
      assert.equal(side, 0);
      assert.equal(sign, 1);
    });

    it('-0d0 => { count: 0, side: 0, sign: -1 }', function() {
      const { count, side, sign } = getDice('-0d0');
      assert.equal(count, 0);
      assert.equal(side, 0);
      assert.equal(sign, -1);
    });
  });

  const getRandomInt = max => Math.floor(Math.random() * max) + 1;

  const takeRandom = function(...items) {
    return items[getRandomInt(items.length) - 1];
  }

  const randomTestCount = getRandomInt(50);
  describe(`test random ${randomTestCount} valid user input`, function() {
    for (let test = 0; test < randomTestCount; test++) {
      // randomize new dice
      const randomDice = {
        count: getRandomInt(11) - 1,
        side: takeRandom(0, 1, 4, 6, 8, 10, 12, 20, 100),
        sign: takeRandom(1, -1),
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
      const sign = randomDice.sign === -1 ? '-' : '';

      // glue notation
      const notation = `${sign}${count}${side}`;
      
      it(`${notation} => { count: ${randomDice.count}, side: ${randomDice.side}, sign: ${randomDice.sign} }`, function() {
        const resultDice = getDice(`${notation}`);
        assert.equal(resultDice.count, randomDice.count);
        assert.equal(resultDice.side, randomDice.side);
        assert.equal(resultDice.sign, randomDice.sign);
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
          getDice(wrongNotation)
        });
      });
    }
  });
});
