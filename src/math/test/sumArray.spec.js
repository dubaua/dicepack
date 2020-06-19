import assert from 'assert';
import sumArray from '@/math/sumArray.js';

describe('sumArray', () => {
  it('works with positive ints', () => {
    const sum = sumArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.strictEqual(sum, 55);
  });

  it('works with negative ints', () => {
    const sum = sumArray([-1, -1, -1, -1]);
    assert.strictEqual(sum, -4);
  });

  it('works with floats', () => {
    const sum = sumArray([0.5, -1.5, 1, 0]);
    assert.strictEqual(sum, 0);
  });
});
