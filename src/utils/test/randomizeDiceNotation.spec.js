import assert from 'assert';
import randomizeDiceNotation from '@/utils/randomizeDiceNotation.js';
import NOTATION_REGEXP from '@/core/notationRegexp.js';

describe('randomizeDiceNotation', () => {
  const notation = randomizeDiceNotation({ maxCount: 2, sides: [4, 6, 8, 10, 12], maxLength: 3 });
  it('is string', () => {
    const isString = typeof notation === 'string';
    assert.strictEqual(isString, true);
  });

  it('is notation', () => {
    const isNotation = NOTATION_REGEXP.test(notation);
    assert.strictEqual(isNotation, true);
  });

  it('test 1000 random notations', () => {
    const maxCount = 10;
    const sides = [0, 1, 4, 6, 8, 10, 12, 20];
    const maxLength = 3;
    const results = [];
    for (let i = 0; i < 1000; i++) {
      results.push(randomizeDiceNotation({ maxCount, sides, maxLength }));
    }
    const everyIsNotation = results.every((notation) => NOTATION_REGEXP.test(notation));
    assert.strictEqual(everyIsNotation, true);
  });
});
