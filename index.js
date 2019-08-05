const NOTATION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;
const DICE_REGEXP = /^-?(\d+|\d*d\d+)$/;
const STARTING_D_WIHTOUT_COUNT = /^(-?)d/;

/*
 * [A-Z]+       captures uppercase
 * \s           captures spaces
 * d1(\D+|$)    captures d1
 * (\D+|^)1d\d+ captures 1dN
 * -(\d*)d      captures negative dice
*/
const NOT_NORMALIZED_REGEXP = /[A-Z]+|\s|d1(\D+|$)|(\D+|^)1d\d+|-(\d*)d/;

function addProperty({ value, key, validator, description, context }) {
  if (typeof value === 'undefined') {
    throw new TypeError(`${key} is required`);
  }
  if (typeof validator === 'function' && validator(value)) {
    context[key] = value;
  } else {
    throw new TypeError(`expected ${key} is ${description}, got ${typeof value} ${value}.`);
  }
}

class Dice {
  constructor({ count, side }) {
    addProperty({
      value: count,
      key: 'count',
      validator: x => typeof x === 'number' && x !== 0 && Math.round(x) === x,
      description: 'a non zero integer',
      context: this,
    });

    addProperty({
      value: side,
      key: 'side',
      validator: x => typeof x === 'number' && x > 0 && Math.round(x) === x,
      description: 'a natural number',
      context: this,
    });
  }
}

class Result {
  constructor({ type, side, rolled }) {
    addProperty({
      value: type,
      key: 'type',
      validator: x => x === 'die' || x === 'number',
      description: "string 'die' or 'number'",
      context: this,
    });

    addProperty({
      value: side,
      key: 'side',
      validator: x => typeof x === 'number' && x > 0 && Math.round(x) === x,
      description: 'a natural number',
      context: this,
    });

    addProperty({
      value: rolled,
      key: 'rolled',
      validator: x => typeof x === 'number' && x !== 0 && Math.round(x) === x,
      description: 'a natural number',
      context: this,
    });
  }
}

class Detailed {
  constructor({ result, rolls }) {
    addProperty({
      value: result,
      key: 'result',
      validator: x => typeof x === 'number' && Math.round(x) === x,
      description: 'an integer',
      context: this,
    });

    addProperty({
      value: rolls,
      key: 'rolls',
      validator: x => Array.isArray(x) && x.every(y => Array.isArray(y) && y.every(z => z instanceof Result)),
      description: 'an array of Results',
      context: this,
    });
  }
}

class Stats {
  constructor({ distribution, average, variance, standardDeviation }) {
    addProperty({
      value: distribution,
      key: 'distribution',
      validator: x => Array.isArray(x),
      description: 'an array',
      context: this,
    });

    addProperty({
      value: average,
      key: 'average',
      validator: x => typeof x === 'number',
      description: 'a number',
      context: this,
    });

    addProperty({
      value: variance,
      key: 'variance',
      validator: x => typeof x === 'number' && x >= 0,
      description: 'a non negative number',
      context: this,
    });

    addProperty({
      value: standardDeviation,
      key: 'standardDeviation',
      validator: x => typeof x === 'number' && x >= 0,
      description: 'a non negative number',
      context: this,
    });
  }
}

const validate = function(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given notation ${string} isn't valid`);
  }
  return string;
};

const castToNumber = string => parseInt(string, 10) || 0;

const getDice = function(notation) {
  const [count = 1, side = 1] = validate(notation, DICE_REGEXP)
    .replace(STARTING_D_WIHTOUT_COUNT, '$11d') // restore dropped 1d with sign 1d
    .split('d')
    .map(castToNumber);
  return new Dice({ count, side });
};

const toDice = notation =>
  validate(notation, NOTATION_REGEXP)
    .replace(/-/g, '+-')
    .split('+')
    .filter(string => string !== '')
    .map(getDice);

const getRandomInt = max => Math.floor(Math.random() * max) + 1;

const statsDice = function(dice) {
  const independent = dice.reduce(function(accumulator, { count, side }) {
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    if (side === 1) {
      accumulator.push([count]);
    } else {
      let dieProbabilities = [];
      for (let result = 1; result <= side; result++) {
        dieProbabilities.push(sign * result);
      }
      for (let die = 0; die < rollCount; die++) {
        accumulator.push(dieProbabilities);
      }
    }
    return accumulator;
  }, []);

  const combined = independent.reduce(directProduct, [0]);

  const count = combined.length;

  const chance = 1 / count;

  const compact = combined
    .map(result => ({ chance, result }))
    .reduce((groups, { result, chance }) => {
      const key = String(result);
      if (!groups[key]) {
        groups[key] = { result, chance };
      } else {
        groups[key].chance += chance;
      }
      return groups;
    }, {});

  const distribution = Object.values(compact).sort((a, b) => a.result - b.result);

  const average = combined.reduce(sum, 0) / count;

  const variance = combined.map(result => Math.pow(result - average, 2)).reduce(sum, 0) / count;

  const standardDeviation = Math.sqrt(variance);

  return new Stats({ distribution, average, variance, standardDeviation });
};

const rollDie = function({ count, side }) {
  let results = [];
  if (side === 1) {
    // no need to roll d1
    results.push(count);
  } else {
    const rollCount = Math.abs(count);
    const sign = Math.sign(count);
    for (let i = 0; i < rollCount; i++) {
      results.push(sign * getRandomInt(side));
    }
  }
  return results;
};

const minimize = ({ count, side }) => Math.min(count, count * side);

const maximize = ({ count, side }) => Math.max(count, count * side);

const sum = (accumulator, current) => accumulator + current;

const flatten = (accumulator, current) =>
  Array.isArray(current) ? accumulator.concat(current.reduce(flatten, [])) : accumulator.concat(current);

const directProduct = (accumulator, current) => current.map(x => accumulator.map(y => sum(x, y))).reduce(flatten, []);

const collect = function(rolls, detailed, dice) {
  const result = rolls.reduce(flatten, []).reduce(sum, 0);

  // collecting rolls against dice config
  if (detailed) {
    const _rolls = dice.map((die, index) =>
      rolls[index].map(
        roll =>
          new Result({
            type: die.side === 1 ? 'number' : 'die',
            side: die.side,
            rolled: roll,
          })
      )
    );
    return new Detailed({ result, rolls: _rolls });
  }
  return result;
};

const rollDice = (dice, detailed) => collect(dice.map(rollDie), detailed, dice);

const minDice = dice => collect(dice.map(minimize));

const maxDice = dice => collect(dice.map(maximize));

const roll = (notation, detailed) => rollDice(toDice(notation), detailed);

const min = notation => minDice(toDice(notation));

const max = notation => maxDice(toDice(notation));

const stats = notation => statsDice(toDice(notation));

class DiceSet {
  constructor(notation) {
    this.notation = notation;
    this.dice = toDice(this.notation);
    this.min = minDice(this.dice);
    this.max = maxDice(this.dice);
    this.mean = (this.max - this.min) / 2 + this.min;
    this.roll = detailed => rollDice(this.dice, detailed);
    this.stats = detailed => statsDice(this.dice, detailed);
    this.normalize = () => {
      const normalized = normalize(this.notation);
      this.notation = normalized;
      this.dice = toDice(normalized);
      return normalized;
    };
  }
}

const getDiceSet = notation => new DiceSet(notation);

// order is crucial
const isNormalized = notation => !NOT_NORMALIZED_REGEXP.test(notation) && isDiceGroupedAndSorted(notation);

function isDiceGroupedAndSorted(notation) {
  const dice = toDice(notation).map(die => die.side);
  const isUnique = dice.reduce(unique, []).length === dice.length;
  const isSorted = dice.every(sorted);
  return isUnique && isSorted;
}

const sorted = (e, i, a) => i === 0 || a[i - 1] > e;

const unique = (a, c) => [...a, ...(a.includes(c) ? [] : [c])];

const normalize = notation =>
  isNormalized(notation)
    ? notation
    : toDice(notation.replace(/\s/g, '').toLowerCase())
        .reduce((accumulator, { count, side }) => {
          if (side !== 1 && count < 0) {
            // turn positive
            accumulator.push({ count: Math.abs(count), side });
            // adjust negative modifier
            accumulator.push({ count: count * (side + 1), side: 1 });
          } else {
            // push as is
            accumulator.push({ count, side });
          }
          return accumulator;
        }, [])
        .sort((a, b) => b.side - a.side)
        .reduce((accumulator, { count, side }) => {
          // group same sided dice
          if (accumulator.length && side === accumulator[accumulator.length - 1].side) {
            accumulator[accumulator.length - 1].count += count;
          } else {
            accumulator.push({ count, side });
          }
          return accumulator;
        }, [])
        // turn to string array
        .map(
          ({ side, count }) =>
            `${count < 0 ? '-' : ''}${Math.abs(count) === 1 && side !== 1 ? '' : Math.abs(count)}${
              side !== 1 ? 'd' + side : ''
            }`
        )
        .join('+')
        .replace('+-', '-');

export {
  Dice,
  Result,
  Detailed,
  Stats,
  toDice,
  getDice,
  rollDie,
  getDiceSet,
  roll,
  min,
  max,
  stats,
  normalize,
  isNormalized,
};
