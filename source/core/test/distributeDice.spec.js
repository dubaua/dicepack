import assert from 'assert';
import Dice from '../../types/Dice.js';
import Point from '../../types/Point.js';
import distributeDice from '../distributeDice.js';

const approximatelyEquals = (value1, value2, epsilon = 0.01) => Math.abs(value1 - value2) < epsilon;

describe('distributeDice', function() {
  describe('testing types', function() {
    const distribution = distributeDice([new Dice({ count: 1, side: 6 })]);
    it('distribution is Array', function() {
      const isArray = Array.isArray(distribution);
      assert.strictEqual(isArray, true);
    });

    it('each point instance of Point', function() {
      const eachIsPoint = distribution.every(point => point instanceof Point);
      assert.strictEqual(eachIsPoint, true);
    });
  });

  describe('testing d6', function() {
    const distribution = distributeDice([new Dice({ count: 1, side: 6 })]);
    const first = distribution[0];
    const last = distribution[distribution.length - 1];

    it('distribution length = 6', function() {
      assert.strictEqual(distribution.length, 6);
    });

    it('distribution first result = 1', function() {
      assert.strictEqual(first.result, 1);
    });

    it('distribution last result = 6', function() {
      assert.strictEqual(last.result, 6);
    });

    it('chance of 3 ~= 1/6', function() {
      assert.strictEqual(approximatelyEquals(distribution[2].chance, 1 / 6), true);
    });
  });

  describe('testing 2d4', function() {
    const distribution = distributeDice([new Dice({ count: 2, side: 4 })]);
    const first = distribution[0];
    const last = distribution[distribution.length - 1];

    it('distribution length = 7', function() {
      assert.strictEqual(distribution.length, 7);
    });

    it('distribution first result = 2', function() {
      assert.strictEqual(first.result, 2);
    });

    it('distribution first chance ~= 1/16', function() {
      assert.strictEqual(approximatelyEquals(first.chance, 1 / 16), true);
    });

    it('distribution last result = 8', function() {
      assert.strictEqual(last.result, 8);
    });

    it('distribution last chance ~= 1/16', function() {
      assert.strictEqual(approximatelyEquals(last.chance, 1 / 16), true);
    });

    it('chance of 5 ~= 1/4', function() {
      assert.strictEqual(approximatelyEquals(distribution[3].chance, 1 / 4), true);
    });
  });

  describe('testing d12+d10+d6+5', function() {
    const distribution = distributeDice([
      new Dice({ count: 1, side: 12 }),
      new Dice({ count: 1, side: 10 }),
      new Dice({ count: 1, side: 6 }),
      new Dice({ count: 5, side: 1 }),
    ]);

    const first = distribution[0];
    const last = distribution[distribution.length - 1];

    it('distribution length = 26', function() {
      assert.strictEqual(distribution.length, 26);
    });

    it('distribution first result = 8', function() {
      assert.strictEqual(first.result, 8);
    });

    it('distribution first chance ~= 1/720', function() {
      assert.strictEqual(approximatelyEquals(first.chance, 1 / (12 * 10 * 6)), true);
    });

    it('distribution last result = 33', function() {
      assert.strictEqual(last.result, 33);
    });

    it('distribution last chance ~= 1/720', function() {
      assert.strictEqual(approximatelyEquals(last.chance, 1 / (12 * 10 * 6)), true);
    });

    it('chance of 17 ~= 1/16', function() {
      assert.strictEqual(approximatelyEquals(distribution[9].chance, (1 / (12 * 10 * 6)) * 45), true);
    });
  });

  describe('testing 2d0', function() {
    const distribution = distributeDice([new Dice({ count: 2, side: 0 })]);

    const first = distribution[0];
    it('distribution length = 1', function() {
      assert.strictEqual(distribution.length, 1);
    });

    it('distribution result = 0', function() {
      assert.strictEqual(first.result, 0);
    });

    it('distribution chance = 1', function() {
      assert.strictEqual(first.chance === 1, true);
    });
  });

  describe('testing 5d1', function() {
    const distribution = distributeDice([new Dice({ count: 5, side: 1 })]);

    const first = distribution[0];
    it('distribution length = 1', function() {
      assert.strictEqual(distribution.length, 1);
    });

    it('distribution result = 5', function() {
      assert.strictEqual(first.result, 5);
    });

    it('distribution chance = 1', function() {
      assert.strictEqual(first.chance === 1, true);
    });
  });

  describe('testing empty array', function() {
    const distribution = distributeDice([]);

    const first = distribution[0];
    it('distribution length = 1', function() {
      assert.strictEqual(distribution.length, 1);
    });

    it('distribution result = 0', function() {
      assert.strictEqual(first.result, 0);
    });

    it('distribution chance = 1', function() {
      assert.strictEqual(first.chance === 1, true);
    });
  });
});
