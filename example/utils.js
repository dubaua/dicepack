export const round = function(number, precision = 2) {
  const pow = Math.pow(10, precision);
  return Math.round(number * pow) / pow;
};

export const getRandomInt = max => Math.floor(Math.random() * max) + 1;

export const takeRandom = (...items) => items[getRandomInt(items.length) - 1];

export const randomizeDie = function(countRange, sides) {
  const dice = {
    count: takeRandom(1, -1) * getRandomInt(countRange),
    side: takeRandom(...sides),
  };

  const side = dice.side === 1 ? takeRandom(`d${dice.side}`, '') : `d${dice.side}`;
  const count = side !== '' && dice.count === 1 ? takeRandom(dice.count, '') : dice.count;

  return `${count}${side}`;
};

export const randomizeDiceNotation = (countRange, sides, maxLength) => {
  const length = getRandomInt(maxLength);
  let notation = [];
  for (let i = 0; i < length; i++) {
    notation.push(randomizeDie(countRange, sides));
  }
  return notation.join('+').replace(/\+\-/g, '-');
};

export const getRandomNotation = () => randomizeDiceNotation(getRandomInt(10), [1, 4, 6, 8, 10, 12, 20, 100], 3);
