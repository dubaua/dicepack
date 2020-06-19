import assert from 'assert';
import isArraySorted from '@/utils/isArraySorted.js';

describe('isArraySorted', () => {
  it('[3,2,1,0] is sorted', () => {
    const isSorted = isArraySorted([3, 2, 1, 0]);
    assert.strictEqual(isSorted, true);
  });

  it('[3,3,3] is not sorted', () => {
    const isSorted = isArraySorted([3, 3, 3]);
    assert.strictEqual(isSorted, false);
  });

  it('empty array is sorted', () => {
    const isSorted = isArraySorted([]);
    assert.strictEqual(isSorted, true);
  });

  it('throws an error if boolean passed', () => {
    assert.throws(() => {
      isArraySorted(false);
    });
  });

  it('throws an error if nothing passed', () => {
    assert.throws(() => {
      isArraySorted();
    });
  });

  it('throws an error if number passed', () => {
    assert.throws(() => {
      isArraySorted(1);
    });
  });

  it('throws an error if object passed', () => {
    assert.throws(() => {
      isArraySorted({ foo: 'bar' });
    });
  });

  it('throws an error if function passed', () => {
    assert.throws(() => {
      isArraySorted((a) => a);
    });
  });
});
