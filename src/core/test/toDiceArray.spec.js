import assert from 'assert';
import toDiceArray from '@/core/toDiceArray.js';
import isDice from '@/utils/isDice.js';

describe('toDiceArray', () => {
  const result = toDiceArray('2d6+5');
  const typeofResultIsArray = Array.isArray(result);
  it('returns result type of array', () => {
    assert.strictEqual(typeofResultIsArray, true);
  });

  const length = result.length;
  it('toDiceArray 2d6+5 result length = 2', () => {
    assert.strictEqual(length, 2);
  });

  const eachIsDice = result.every(isDice);
  it('each result is Dice', () => {
    assert.strictEqual(eachIsDice, true);
  });

  it(`throws an error if expression isn't valid`, () => {
    assert.throws(() => {
      toDiceArray('2d');
    });
  });
});
