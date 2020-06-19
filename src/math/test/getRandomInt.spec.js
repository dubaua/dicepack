import assert from 'assert';
import getRandomInt from '@/math/getRandomInt.js';
import isInteger from '@/utils/isInteger.js';

describe('getRandomInt', () => {
  it('test 1000 results is in range', () => {
    const max = 100;
    const results = [];
    for (let i = 0; i < 1000; i++) {
      results.push(getRandomInt(max));
    }
    const everyIsInRange = results.every((result) => 1 <= result && result <= max);
    assert.strictEqual(everyIsInRange, true);
  });

  it('test 1000 results is integer', () => {
    const max = 6;
    const results = [];
    for (let i = 0; i < 1000; i++) {
      results.push(getRandomInt(max));
    }
    const everyIsInteger = results.every(isInteger);
    assert.strictEqual(everyIsInteger, true);
  });
});
