import getRandomInt from './getRandomInt.js';
import randomizeDie from './randomizeDie.js';

const randomizeDiceNotation = ({ maxCount, sides, maxLength }) => {
  const length = getRandomInt(maxLength);
  let notation = [];
  for (let i = 0; i < length; i++) {
    notation.push(randomizeDie({maxCount, sides}));
  }
  return notation.join('+').replace(/\+\-/g, '-');
};

export default randomizeDiceNotation;
