import assert from 'assert';
import { stats, Stats } from '../index.js';

const approximatelyEquals = (value1, value2, epsilon = 0.01) => Math.abs(value1 - value2) < epsilon;

describe('stats', function() {
  describe('testing d6', function() {
    const result = stats('d6');
    const { average, variance, standardDeviation, distribution } = result;

    it('returns result type of Stats', function() {
      assert.strictEqual(result instanceof Stats, true);
    });

    const expectedAverage = (1 + 2 + 3 + 4 + 5 + 6) / 6;
    it('average = 3.5', function() {
      assert.strictEqual(expectedAverage, average);
    });

    const expectedVariance =
      (Math.pow(1 - expectedAverage, 2) +
       Math.pow(2 - expectedAverage, 2) +
       Math.pow(3 - expectedAverage, 2) +
       Math.pow(4 - expectedAverage, 2) +
       Math.pow(5 - expectedAverage, 2) +
       Math.pow(6 - expectedAverage, 2)) /
      6;
    it('variance ~= 2.92', function() {
      assert.strictEqual(approximatelyEquals(expectedVariance, variance), true);
    });

    const expectedStandardDeviation = Math.sqrt(expectedVariance);
    it('standardDeviation ~= 1.7', function() {
      assert.strictEqual(approximatelyEquals(expectedStandardDeviation, standardDeviation), true);
    });

    it('distribution length = 6', function() {
      assert.strictEqual(distribution.length, 6);
    });

    it('chance of 3 ~= 1/6', function() {
      assert.strictEqual(approximatelyEquals(distribution[2].chance, 1 / 6), true);
    });
  });

  describe('testing 2d4', function() {
    const result = stats('2d4');
    const { average, variance, standardDeviation, distribution } = result;

    it('returns result type of Stats', function() {
      assert.strictEqual(result instanceof Stats, true);
    });

    const expectedAverage = (2 + 3 + 4 + 5 + 3 + 4 + 5 + 6 + 4 + 5 + 6 + 7 + 5 + 6 + 7 + 8) / 16;
    it('average = 5', function() {
      assert.strictEqual(expectedAverage, average);
    });

    const expectedVariance =
      (Math.pow(2 - expectedAverage, 2) +
       Math.pow(3 - expectedAverage, 2) +
       Math.pow(4 - expectedAverage, 2) +
       Math.pow(5 - expectedAverage, 2) +
       Math.pow(3 - expectedAverage, 2) +
       Math.pow(4 - expectedAverage, 2) +
       Math.pow(5 - expectedAverage, 2) +
       Math.pow(6 - expectedAverage, 2) +
       Math.pow(4 - expectedAverage, 2) +
       Math.pow(5 - expectedAverage, 2) +
       Math.pow(6 - expectedAverage, 2) +
       Math.pow(7 - expectedAverage, 2) +
       Math.pow(5 - expectedAverage, 2) +
       Math.pow(6 - expectedAverage, 2) +
       Math.pow(7 - expectedAverage, 2) +
       Math.pow(8 - expectedAverage, 2)) /
      16;
    it('variance ~= 2.5', function() {
      assert.strictEqual(approximatelyEquals(expectedVariance, variance), true);
    });

    const expectedStandardDeviation = Math.sqrt(expectedVariance);
    it('standardDeviation ~= 1.58', function() {
      assert.strictEqual(approximatelyEquals(expectedStandardDeviation, standardDeviation), true);
    });

    it('distribution length = 7', function() {
      assert.strictEqual(distribution.length, 7);
    });

    it('chance of 2 ~= 1/16', function() {
      assert.strictEqual(approximatelyEquals(distribution[0].chance, 1 / 16), true);
    });

    it('chance of 5 ~= 1/4', function() {
      assert.strictEqual(approximatelyEquals(distribution[3].chance, 1 / 4), true);
    });
  });

  describe('testing d12+d10+d6+5', function() {
    const result = stats('d12+d10+d6+5');
    const { average, variance, standardDeviation, distribution } = result;

    it('returns result type of Stats', function() {
      assert.strictEqual(result instanceof Stats, true);
    });

    it('average = 20.5', function() {
      assert.strictEqual(20.5, average);
    });

    it('variance ~= 23.08', function() {
      assert.strictEqual(approximatelyEquals(23.08, variance), true);
    });

    it('standardDeviation ~= 4.8', function() {
      assert.strictEqual(approximatelyEquals(4.8, standardDeviation), true);
    });

    it('distribution length = 26', function() {
      assert.strictEqual(distribution.length, 26);
    });

    it('chance of 8 ~= 1/720', function() {
      assert.strictEqual(approximatelyEquals(distribution[0].chance, 1 / (12 * 10 * 6)), true);
    });
  });
});
