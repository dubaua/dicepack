import assert from 'assert';
import isInteger from '@/utils/isInteger.js';

describe('isInteger', () => {
  it('correct positive integer 1', () => {
    assert.strictEqual(isInteger(1), true);
  });

  it('correct negative integer -1', () => {
    assert.strictEqual(isInteger(-1), true);
  });

  it('correct zero integer 0', () => {
    assert.strictEqual(isInteger(0), true);
  });

  it('not correct float', () => {
    assert.strictEqual(isInteger(Math.PI), false);
  });

  it('not correct NaN', () => {
    assert.strictEqual(isInteger(NaN), false);
  });

  it('not correct Infinity', () => {
    assert.strictEqual(isInteger(Infinity), false);
  });

  it('not correct boolean', () => {
    assert.strictEqual(isInteger(true), false);
  });
});
