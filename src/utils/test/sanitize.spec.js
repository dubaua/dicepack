import assert from 'assert';
import sanitize from '@/utils/sanitize.js';

describe('sanitize', () => {
  it('removes spaces', () => {
    assert.strictEqual(sanitize('top    ke  k'), 'topkek');
  });

  it('turns lowercase', () => {
    assert.strictEqual(sanitize('TopKek'), 'topkek');
  });

  it('casts to string', () => {
    assert.strictEqual(sanitize(true), 'true');
  });
});
