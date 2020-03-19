import assert from 'assert';
import approximatelyEquals from '@/math/approximatelyEquals.js';

describe('approximatelyEquals', () => {
  it('0.01 ~= 0.011', () => {
    assert.strictEqual(approximatelyEquals(0.01, 0.011), true);
  });

  it('0.005 ~= 0.015', () => {
    assert.strictEqual(approximatelyEquals(0.005, 0.015), true);
  });

  it('0.1 !~= 0.15', () => {
    assert.strictEqual(approximatelyEquals(0.1, 0.15), false);
  });
});
