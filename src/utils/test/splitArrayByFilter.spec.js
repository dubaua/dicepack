import assert from 'assert';
import splitArrayByFilter from '@/utils/splitArrayByFilter.js';

describe('splitArrayByFilter', () => {
  it('correct split array of numbers', () => {
    const numberArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const [evenArray, oddArray] = splitArrayByFilter(numberArray, (number) => number % 2 === 0);
    const isEvenArray = evenArray.every((number) => number % 2 === 0);
    const isOddArray = oddArray.every((number) => number % 2 !== 0);
    const isCorrectlySplitted = isEvenArray && isOddArray;
    assert.strictEqual(isCorrectlySplitted, true);
  });

  it('correctly match all elements', () => {
    const numberArray = [2, 4, 5, 7];
    const [matchedArray, unmatchedArray] = splitArrayByFilter(numberArray, (number) => number > 0);
    const allMatched = unmatchedArray.length === 0;
    assert.strictEqual(allMatched, true);
  });

  it('sum length of matched and unmatched is equal to source array length', () => {
    const numberArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const [evenArray, oddArray] = splitArrayByFilter(numberArray, (number) => number % 2 === 0);
    const isLengthEqual = numberArray.length === evenArray.length + oddArray.length;
    assert.strictEqual(isLengthEqual, true);
  });
});
