import assert from 'assert';
import distributeDiceArray from '@/core/distributeDiceArray.js';

const approximatelyEquals = (value1, value2, epsilon = 0.01) => Math.abs(value1 - value2) < epsilon;

describe('distributeDiceArray', () => {
  describe('testing d6', () => {
    const distribution = distributeDiceArray([{ count: 1, side: 6 }]);

    it('has 1, 2, 3, 4, 5, 6 keys', () => {
      const keys = [1, 2, 3, 4, 5, 6];
      const hasEveryKey = keys
        .map((key) => Object.prototype.hasOwnProperty.call(distribution, String(key)))
        .every((result) => result === true);
      assert.strictEqual(hasEveryKey, true);
    });

    it('every chance ~= 1 / 6', () => {
      const keys = [1, 2, 3, 4, 5, 6];
      const everyApproxSixth = keys
        .map((key) => approximatelyEquals(distribution[key], 1 / 6))
        .every((result) => result === true);
      assert.strictEqual(everyApproxSixth, true);
    });
  });

  describe('testing 2d4', () => {
    const distribution = distributeDiceArray([{ count: 2, side: 4 }]);

    it('has 2, 3, 4, 5, 6, 7, 8 keys', () => {
      const keys = [2, 3, 4, 5, 6, 7, 8];
      const hasEveryKey = keys
        .map((key) => Object.prototype.hasOwnProperty.call(distribution, String(key)))
        .every((result) => result === true);
      assert.strictEqual(hasEveryKey, true);
    });

    it('chance of 2 ~= 1 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[2], 1 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 3 ~= 2 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[3], 2 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 4 ~= 3 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[4], 3 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 5 ~= 4 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[5], 4 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 6 ~= 3 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[6], 3 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 7 ~= 2 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[7], 2 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 8 ~= 1 / 16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[8], 1 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });
  });

  describe('testing d12+d10+d6+5', () => {
    const distribution = distributeDiceArray([
      { count: 1, side: 12 },
      { count: 1, side: 10 },
      { count: 1, side: 6 },
      { count: 5, side: 1 },
    ]);

    it('has 8..33 keys', () => {
      const keys = [
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
      ];
      const hasEveryKey = keys
        .map((key) => Object.prototype.hasOwnProperty.call(distribution, String(key)))
        .every((result) => result === true);
      assert.strictEqual(hasEveryKey, true);
    });

    it('chance of 8 ~= 1/720', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[8], 1 / 720);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 33 ~= 1/720', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[33], 1 / 720);
      assert.strictEqual(isApproximatelyEquals, true);
    });

    it('chance of 17 ~= 1/16', () => {
      const isApproximatelyEquals = approximatelyEquals(distribution[17], 1 / 16);
      assert.strictEqual(isApproximatelyEquals, true);
    });
  });

  describe('testing 2d0', () => {
    const distribution = distributeDiceArray([{ count: 2, side: 0 }]);

    it('has 0 key', () => {
      const hasZeroKey = Object.prototype.hasOwnProperty.call(distribution, '0');
      assert.strictEqual(hasZeroKey, true);
    });

    it('chance of 0 === 1', () => {
      assert.strictEqual(distribution[0], 1);
    });
  });

  describe('testing 5d1', () => {
    const distribution = distributeDiceArray([{ count: 5, side: 1 }]);

    it('has 5 key', () => {
      const hasFiveKey = Object.prototype.hasOwnProperty.call(distribution, '5');
      assert.strictEqual(hasFiveKey, true);
    });

    it('chance of 5 === 1', () => {
      assert.strictEqual(distribution[5], 1);
    });
  });

  describe('testing empty array', () => {
    const distribution = distributeDiceArray([]);

    it('has 0 key', () => {
      const hasZeroKey = Object.prototype.hasOwnProperty.call(distribution, '0');
      assert.strictEqual(hasZeroKey, true);
    });

    it('chance of 0 === 1', () => {
      assert.strictEqual(distribution[0], 1);
    });
  });
});
