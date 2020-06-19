import assert from 'assert';
import isDice from '@/utils/isDice.js';

describe('isDice', () => {
  it('correct dice d6', () => {
    assert.strictEqual(isDice({ count: 1, side: 6 }), true);
  });

  it('correct dice 0d6', () => {
    assert.strictEqual(isDice({ count: 0, side: 6 }), true);
  });

  it('correct dice d0', () => {
    assert.strictEqual(isDice({ count: 1, side: 0 }), true);
  });

  it('correct dice 0d0', () => {
    assert.strictEqual(isDice({ count: 0, side: 0 }), true);
  });

  it('correct dice -2d4', () => {
    assert.strictEqual(isDice({ count: -2, side: 4 }), true);
  });

  it('not correct dice: negative side', () => {
    assert.strictEqual(isDice({ count: 2, side: -1 }), false);
  });

  it('not correct dice: float side', () => {
    assert.strictEqual(isDice({ count: 2, side: 1.5 }), false);
  });

  it('not correct dice: float count', () => {
    assert.strictEqual(isDice({ count: 2.5, side: 6 }), false);
  });
});
