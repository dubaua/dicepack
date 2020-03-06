import assert from 'assert';
import distributeDiceArray from '@/core/distributeDiceArray.js';
import isPoint from '@/utils/isPoint';

const approximatelyEquals = (value1, value2, epsilon = 0.01) => Math.abs(value1 - value2) < epsilon;

describe('distributeDiceArray', () => {
  describe('testing types', () => {
    const distribution = distributeDiceArray([{ count: 1, side: 6 }]);
    it('distribution is Array', () => {
      const isArray = Array.isArray(distribution);
      assert.strictEqual(isArray, true);
    });

    it('each point is Point', () => {
      const eachIsPoint = distribution.every(isPoint);
      assert.strictEqual(eachIsPoint, true);
    });
  });

  describe('testing d6', () => {
    const distribution = distributeDiceArray([{ count: 1, side: 6 }]);
    const first = distribution[0];
    const last = distribution[distribution.length - 1];

    it('distribution length = 6', () => {
      assert.strictEqual(distribution.length, 6);
    });

    it('distribution first result = 1', () => {
      assert.strictEqual(first.result, 1);
    });

    it('distribution last result = 6', () => {
      assert.strictEqual(last.result, 6);
    });

    it('chance of 3 ~= 1/6', () => {
      assert.strictEqual(approximatelyEquals(distribution[2].chance, 1 / 6), true);
    });
  });

  describe('testing 2d4', () => {
    const distribution = distributeDiceArray([{ count: 2, side: 4 }]);
    const first = distribution[0];
    const last = distribution[distribution.length - 1];

    it('distribution length = 7', () => {
      assert.strictEqual(distribution.length, 7);
    });

    it('distribution first result = 2', () => {
      assert.strictEqual(first.result, 2);
    });

    it('distribution first chance ~= 1/16', () => {
      assert.strictEqual(approximatelyEquals(first.chance, 1 / 16), true);
    });

    it('distribution last result = 8', () => {
      assert.strictEqual(last.result, 8);
    });

    it('distribution last chance ~= 1/16', () => {
      assert.strictEqual(approximatelyEquals(last.chance, 1 / 16), true);
    });

    it('chance of 5 ~= 1/4', () => {
      assert.strictEqual(approximatelyEquals(distribution[3].chance, 1 / 4), true);
    });
  });

  describe('testing d12+d10+d6+5', () => {
    const distribution = distributeDiceArray([
      { count: 1, side: 12 },
      { count: 1, side: 10 },
      { count: 1, side: 6 },
      { count: 5, side: 1 },
    ]);

    const first = distribution[0];
    const last = distribution[distribution.length - 1];

    it('distribution length = 26', () => {
      assert.strictEqual(distribution.length, 26);
    });

    it('distribution first result = 8', () => {
      assert.strictEqual(first.result, 8);
    });

    it('distribution first chance ~= 1/720', () => {
      assert.strictEqual(approximatelyEquals(first.chance, 1 / (12 * 10 * 6)), true);
    });

    it('distribution last result = 33', () => {
      assert.strictEqual(last.result, 33);
    });

    it('distribution last chance ~= 1/720', () => {
      assert.strictEqual(approximatelyEquals(last.chance, 1 / (12 * 10 * 6)), true);
    });

    it('chance of 17 ~= 1/16', () => {
      assert.strictEqual(approximatelyEquals(distribution[9].chance, (1 / (12 * 10 * 6)) * 45), true);
    });
  });

  describe('testing 2d0', () => {
    const distribution = distributeDiceArray([{ count: 2, side: 0 }]);

    const first = distribution[0];
    it('distribution length = 1', () => {
      assert.strictEqual(distribution.length, 1);
    });

    it('distribution result = 0', () => {
      assert.strictEqual(first.result, 0);
    });

    it('distribution chance = 1', () => {
      assert.strictEqual(first.chance === 1, true);
    });
  });

  describe('testing 5d1', () => {
    const distribution = distributeDiceArray([{ count: 5, side: 1 }]);

    const first = distribution[0];
    it('distribution length = 1', () => {
      assert.strictEqual(distribution.length, 1);
    });

    it('distribution result = 5', () => {
      assert.strictEqual(first.result, 5);
    });

    it('distribution chance = 1', () => {
      assert.strictEqual(first.chance === 1, true);
    });
  });

  describe('testing empty array', () => {
    const distribution = distributeDiceArray([]);

    const first = distribution[0];
    it('distribution length = 1', () => {
      assert.strictEqual(distribution.length, 1);
    });

    it('distribution result = 0', () => {
      assert.strictEqual(first.result, 0);
    });

    it('distribution chance = 1', () => {
      assert.strictEqual(first.chance === 1, true);
    });
  });
});
