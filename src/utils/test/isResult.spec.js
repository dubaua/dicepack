import assert from 'assert';
import isResult from '@/utils/isResult.js';

describe('isResult', () => {
  it('correct result with side and rolled array', () => {
    assert.strictEqual(isResult({ side: 6, rolled: [1, 2, 3, 4] }), true);
  });

  it('not correct result without side', () => {
    assert.strictEqual(isResult({ rolled: [1, 2, 3] }), false);
  });

  it('not correct result with non integer side', () => {
    assert.strictEqual(isResult({ side: false, rolled: [1, 2, 3] }), false);
  });

  it('not correct result without results, throws an error', () => {
    assert.throws(() => {
      assert.strictEqual(isResult({ side: 10 }), false);
    });
  });

  it('not correct result with rolled not array, throws an error', () => {
    assert.throws(() => {
      assert.strictEqual(isResult({ side: 6, rolled: false }), false);
    });
  });
});
