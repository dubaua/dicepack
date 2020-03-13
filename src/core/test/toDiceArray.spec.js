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

  const [sixth, flat] = result;
  it('sixth parsed correctly: side = 6, count = 2', () => {
    const { side, count } = sixth;
    const isCorrect = side === 6 && count === 2;
    assert.strictEqual(isCorrect, true);
  });

  it('flat parsed correctly: side = 1, count = 5', () => {
    const { side, count } = flat;
    const isCorrect = side === 1 && count === 5;
    assert.strictEqual(isCorrect, true);
  });

  it(`throws an error if expression isn't valid`, () => {
    assert.throws(() => {
      toDiceArray('2d');
    });
  });
});
