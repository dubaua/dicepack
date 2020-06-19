import assert from 'assert';
import getDiceArrayComplexity from '@/math/getDiceArrayComplexity.js';

describe('getDiceArrayComplexity', () => {
  it('complexity of 1d6 is 6', () => {
    const complexity = getDiceArrayComplexity([{ count: 1, side: 6 }]);
    assert.strictEqual(complexity, 6);
  });

  it('complexity of 2d6 is 36', () => {
    const complexity = getDiceArrayComplexity([{ count: 2, side: 6 }]);
    assert.strictEqual(complexity, 36);
  });

  it('complexity of 3d6 is 216', () => {
    const complexity = getDiceArrayComplexity([{ count: 3, side: 6 }]);
    assert.strictEqual(complexity, 216);
  });

  it('complexity of 2d4 is 16', () => {
    const complexity = getDiceArrayComplexity([{ count: 2, side: 4 }]);
    assert.strictEqual(complexity, 16);
  });

  it('throws an error if not dice array passed', () => {
    assert.throws(() => {
      getDiceArrayComplexity('koka - moka');
    });
  });
});
