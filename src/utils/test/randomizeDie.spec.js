import assert from 'assert';
import randomizeDie from '@/utils/randomizeDie.js';
import DICE_REGEXP from '@/core/diceRegexp.js';

describe('randomizeDie', () => {
  const notation = randomizeDie({ maxCount: 2, sides: [4, 6, 8, 10, 12] });
  it('is string', () => {
    const isString = typeof notation === 'string';
    assert.strictEqual(isString, true);
  });

  it('is notation', () => {
    const isNotation = DICE_REGEXP.test(notation);
    assert.strictEqual(isNotation, true);
  });

  it('test 1000 random notations', () => {
    const maxCount = 10;
    const sides = [0, 1, 4, 6, 8, 10, 12, 20];
    const results = [];
    for (let i = 0; i < 1000; i++) {
      results.push(randomizeDie({ maxCount, sides }));
    }
    const everyIsNotation = results.every((notation) => DICE_REGEXP.test(notation));
    assert.strictEqual(everyIsNotation, true);
  });
});
