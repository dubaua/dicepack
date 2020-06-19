import assert from 'assert';
import isDetailed from '@/utils/isDetailed.js';

describe('isDetailed', () => {
  it('correct detailed with total, results with side and rolled array', () => {
    assert.strictEqual(isDetailed({ total: 24, results: [{ side: 6, rolled: [1, 2, 3, 4] }] }), true);
  });

  it('not correct detailed with total, results without side and with rolled array', () => {
    assert.strictEqual(isDetailed({ total: 24, results: [{ rolled: [1, 2, 3] }] }), false);
  });

  it('not correct detailed with total and without results', () => {
    assert.strictEqual(isDetailed({ total: 24 }), false);
  });

  it('not correct detailed without total and with results', () => {
    assert.strictEqual(isDetailed({ results: [{ side: 6, rolled: [1, 2, 3, 4] }] }), false);
  });

  it('not correct detailed with total, results with side and with rolled not array, throws an error', () => {
    assert.throws(() => {
      assert.strictEqual(isDetailed({ total: 24, results: [{ side: 6, rolled: false }] }), false);
    });
  });
});
