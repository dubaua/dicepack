import assert from 'assert';
import { getDice } from '../index.js';

describe('getDice', function() {
  describe('custom input', function() {
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

  const randomTestCount = getRandomInt(20);
  describe(`random ${randomTestCount} user input`, function() {
    for (let test = 0; test < randomTestCount; test++) {
      const _count = getRandomInt(randomTestCount);
      const _side = getRandomInt(randomTestCount);
      const _sign = getRandomInt(2) - 2 < 0 ? -1 : 1;

      const __side = _side === 1 ? '' : `d${_side}`;
      let __count;
      if (_side !== 1) {
        __count = _count === 1 ? '' : _count;
      } else {
        __count = _count;
      }
      const __sign = _sign === -1 ? '-' : '';

      const notation = `${__sign}${__count}${__side}`;

      it(`${notation} => { count: ${_count}, side: ${_side}, sign: ${_sign} }`, function() {
        const { count, side, sign } = getDice(`${notation}`);
        assert.equal(count, _count);
        assert.equal(side, _side);
        assert.equal(sign, _sign);
      });
    }
  });
});

// describe('min', function() {
//   describe('results', function() {
//     it('min d4 = 1', function() {
//       assert.equal(min('d4'), 1);
//     });

//     it('min -d4 = -4', function() {
//       assert.equal(min('-d4'), -4);
//     });

//     it('min d4-d4 = -3', function() {
//       assert.equal(min('d4-d4'), -3);
//     });
//   });
// });
