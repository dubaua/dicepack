import assert from 'assert';
import takeRandom from '@/utils/takeRandom.js';

describe('takeRandom', () => {
  it('always return one of arguments', () => {
    const args = [1, 3, 5, 8, 10];
    const results = [];
    for (let i = 0; i < 100; i++) {
      results.push(takeRandom(...args));
    }
    const allResultsIncludesArguments = results.every(result => [1, 3, 5, 8, 10].includes(result));
    assert.strictEqual(allResultsIncludesArguments, true);
  });

  it('returns the only argument', () => {
    assert.strictEqual(takeRandom(1), 1);
  });

  it('returns undefined if nothing passed', () => {
    assert.strictEqual(takeRandom(), undefined);
  });
});
