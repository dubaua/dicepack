import assert from 'assert';
import isArrayUnique from '@/utils/isArrayUnique.js';

describe('isArrayUnique', () => {
  it('[1,2,3] is unique', () => {
    const isUnique = isArrayUnique([1, 2, 3]);
    assert.strictEqual(isUnique, true);
  });

  it('[1,2,2] is not unique', () => {
    const isUnique = isArrayUnique([1, 2, 2]);
    assert.strictEqual(isUnique, false);
  });

  it('empty array is unique', () => {
    const isUnique = isArrayUnique([]);
    assert.strictEqual(isUnique, true);
  });

  it('throws an error if boolean passed', () => {
    assert.throws(() => {
      isArrayUnique(false);
    });
  });

  it('throws an error if nothing passed', () => {
    assert.throws(() => {
      isArrayUnique();
    });
  });

  it('throws an error if number passed', () => {
    assert.throws(() => {
      isArrayUnique(1);
    });
  });

  it('throws an error if object passed', () => {
    assert.throws(() => {
      isArrayUnique({ foo: 'bar' });
    });
  });

  it('throws an error if function passed', () => {
    assert.throws(() => {
      isArrayUnique((a) => a);
    });
  });
});
