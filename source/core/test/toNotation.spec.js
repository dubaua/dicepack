import assert from 'assert';
import Dice from '../../types/Dice.js';
import toNotation from '../toNotation.js';

describe('toNotation', function() {
  const result = toNotation([new Dice({ count: 2, side: 6 }), new Dice({ count: 3, side: 1 })]);
  const typeofResultIsString = typeof result === 'string';
  it('returns result type of string', function() {
    assert.strictEqual(typeofResultIsString, true);
  });

  it('throws an error if anything but Dice array passed', function() {
    assert.throws(function() {
      toNotation([undefined]);
    });
  });

  describe('test examples', function() {
    it('[{ count: 2, side: 6 }, { count: 3, side: 1 }] => 2d6+3', function() {
      const dice = [new Dice({ count: 2, side: 6 }), new Dice({ count: 3, side: 1 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '2d6+3');
    });

    it('[{ count: -1, side: 4 }, { count: 1, side: 4 }] => -d4+d4', function() {
      const dice = [new Dice({ count: -1, side: 4 }), new Dice({ count: 1, side: 4 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '-d4+d4');
    });

    it('[{ count: 1, side: 1 }, { count: -1, side: 1 }] => 1-1', function() {
      const dice = [new Dice({ count: 1, side: 1 }), new Dice({ count: -1, side: 1 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '1-1');
    });

    it('[{ count: 0, side: 4 }] => 0', function() {
      const dice = [new Dice({ count: 0, side: 4 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '0');
    });

    it('[{ count: 0, side: 1 }] => 0', function() {
      const dice = [new Dice({ count: 0, side: 1 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '0');
    });

    it('[{ count: 4, side: 0 }] => 0', function() {
      const dice = [new Dice({ count: 4, side: 0 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '0');
    });

    it('[{ count: 1, side: 0 }] => 0', function() {
      const dice = [new Dice({ count: 1, side: 0 })];
      const result = toNotation(dice);
      assert.strictEqual(result, '0');
    });

    it('[] => 0', function() {
      const dice = [];
      const result = toNotation(dice);
      assert.strictEqual(result, '0');
    });

    it('[{ count: 1, side: 4 }, { count: 0, side: 4 }] => d4+0', function() {
      const dice = [new Dice({ count: 1, side: 4 }), new Dice({ count: 0, side: 4 })];
      const result = toNotation(dice);
      assert.strictEqual(result, 'd4+0');
    });

    it('[{ count: 1, side: 4 }, { count: 4, side: 0 }] => d4+0', function() {
      const dice = [new Dice({ count: 1, side: 4 }), new Dice({ count: 4, side: 0 })];
      const result = toNotation(dice);
      assert.strictEqual(result, 'd4+0');
    });

    it('[{ count: 1, side: 4 }, { count: -4, side: 0 }] => d4+0', function() {
      const dice = [new Dice({ count: 1, side: 4 }), new Dice({ count: -4, side: 0 })];
      const result = toNotation(dice);
      assert.strictEqual(result, 'd4+0');
    });

    it('[{ count: 1, side: 4 }, { count: 0, side: 1 }] => d4+0', function() {
      const dice = [new Dice({ count: 1, side: 4 }), new Dice({ count: 0, side: 1 })];
      const result = toNotation(dice);
      assert.strictEqual(result, 'd4+0');
    });

    it('[{ count: 1, side: 4 }, { count: 1, side: 0 }] => d4+0', function() {
      const dice = [new Dice({ count: 1, side: 4 }), new Dice({ count: 1, side: 0 })];
      const result = toNotation(dice);
      assert.strictEqual(result, 'd4+0');
    });

    it('[{ count: 1, side: 4 }, { count: -1, side: 0 }] => d4+0', function() {
      const dice = [new Dice({ count: 1, side: 4 }), new Dice({ count: -1, side: 0 })];
      const result = toNotation(dice);
      assert.strictEqual(result, 'd4+0');
    });
  });
});
