import assert from 'assert';
import { getDice } from './index.js';

describe('getDice', function() {
  describe('results', function() {
    it('getDice d4 = 1 4 1', function() {
      var { count, side, sign } = getDice('d4');
      assert.equal(count, 1);
      assert.equal(side, 4);
      assert.equal(sign, 1);
    });

    it('getDice -d4 = 1 4 -1', function() {
      var { count, side, sign } = getDice('d4');
      assert.equal(count, 1);
      assert.equal(side, 4);
      assert.equal(sign, -1);
    });
  });
});

describe('min', function() {
  describe('results', function() {
    it('min d4 = 1', function() {
      assert.equal(min('d4'), 1);
    });

    it('min -d4 = -4', function() {
      assert.equal(min('-d4'), -4);
    });

    it('min d4-d4 = -3', function() {
      assert.equal(min('d4-d4'), -3);
    });
  });
});
