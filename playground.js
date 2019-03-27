import { getDiceSet, roll, min, max, stats } from './index.js';
import { create, bindReference } from './render.js';

let refs = {};

let playground = create('div.playground', {}, [
  [
    'input',
    {
      ref: bindReference(refs, 'input'),
      listeners: {
        blur() {
          console.log(refs.input.value);
        },
      },
      attributes: {
        placeholder: randomizeDiceNotation(getRandomInt(10), [1, 4, 6, 8, 10, 12, 20, 100], 3),
      },
    },
  ],
  [
    'button',
    {
      ref: bindReference(refs, 'button'),
      listeners: {
        click() {
          console.log('kek');
        },
      },
      domProps: {
        textContent: 'My button',
      },
    },
  ],
]);

document.body.appendChild(playground);

function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
};

function takeRandom(...items) {
  return items[getRandomInt(items.length) - 1];
};

function randomizeDie(countRange, sides) {
  const dice = {
    count: takeRandom(1, -1) * getRandomInt(countRange),
    side: takeRandom(...sides),
  };

  const side = dice.side === 1 ? takeRandom(`d${dice.side}`, '') : `d${dice.side}`;
  const count = side !== '' && dice.count === 1 ? takeRandom(dice.count, '') : dice.count;

  return `${count}${side}`;
};

function randomizeDiceNotation(countRange, sides, maxLength) {
  const length = getRandomInt(maxLength);
  let notation = [];
  for (let i = 0; i < length; i++) {
    notation.push(randomizeDie(countRange, sides));
  }
  return notation.join('+').replace(/\+\-/g, '-');
};
