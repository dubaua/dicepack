# Simple dice notation roller

Provides set of methods for rolling dice notation strings. There are many other dice roller implementations, but if lovesong already exist that doesn't mean you shouldn't write own one.

# Where can it be useful?

This tool isn't only for board game geeks.

# Types

## Dice

Dice describes how to roll single dice notation.

| property | type     | description                                      |
| -------- | -------- | ------------------------------------------------ |
| count    | `Number` | represents roll count and sign, non zero integer |
| side     | `Number` | dice range, natural number                       |

## Result

Result describes which dice was rolled and result. Used to present results.

| property | type     | description                 |
| -------- | -------- | --------------------------- |
| type     | `String` | 'die' or 'number'           |
| side     | `Number` | dice range, natural number  |
| rolled   | `Number` | roll result, natural number |

## Detailed

Detailed shows sum of rolls and [Result](https://github.com/dubaua/roll-expression#result) for each dice group.

| property | type                   | description                 |
| -------- | ---------------------- | --------------------------- |
| result   | `Number`               | sum of all rolls, integer   |
| rolls    | `Array<Array<Result>>` | results for each dice group |

## Stats

Stats show chance distribution for each possible result, average,
variance and standard deviation.

| property          | type                                      | description                             |
| ----------------- | ----------------------------------------- | --------------------------------------- |
| distribution      | `Array<{result: Number, chance: Number}>` | distribution, array                     |
| average           | `Number`                                  | average, number                         |
| variance          | `Number`                                  | variance, non negative number           |
| standardDeviation | `Number`                                  | standard deviation, non negative number |

# Methods

## roll

`roll(notation: String, ?detailed: Boolean) => number | Detailed`

Accept dice notation string and optional detailed flag. Return resulting roll as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```js
roll('2d6+3')         // 5..15
roll('d6-d4')         // -3..5
roll('6')             // 6
roll('-d6')           // -6..-1
roll('3d12+6d6-d4+3') // 8..74
roll('2d6+3', true)   // { result: 9, rolls: [[2, 4], [3]] }
```

## min

`min(notation: String) => number`

Accept dice notation string. Returns minimum possible result for dice notation as number.

```js
min('2d6+3')  // 5
min('-2d6+3') // -9
min('d6-d6')  // -5
```

## max

`max(notation: String) => number`

Accept dice notation string. Returns maximum possible result for dice notation as number.

```js
max('2d6+3')  // 15
max('-2d6+3') // 1
max('d6-d6')  // 5
```

## stats

`stats(notation: String) => Stats`

Accept dice notation string. Returns [Stats](https://github.com/dubaua/roll-expression#stats) including distribution array, average, variance and standart derivation.

```js
stats('d6') // Stats
/*
{
'distribution': [
  {
    'result': 1,
    'chance': 0.16666666666666666
  },
  {
    'result': 2,
    'chance': 0.16666666666666666
  },
  {
    'result': 3,
    'chance': 0.16666666666666666
  },
  {
    'result': 4,
    'chance': 0.16666666666666666
  },
  {
    'result': 5,
    'chance': 0.16666666666666666
  },
  {
    'result': 6,
    'chance': 0.16666666666666666
  }
],
'average': 3.5,
'variance': 2.9166666666666665,
'standardDeviation': 1.707825127659933
}
*/
```

## normalize

`normalize(notation: String) => String`

Accept dice notation string. Return normalized dice notation string.
Normalized dice notation have following restrictions:
* no spaces: `2d6 + 3 => 2d6+3`;
* no uppercase: `D20 => d20`;
* only positive dice groups: `-d6 => d6-7`;
* dice groups ordered by side: `d4+d10 => d10+d4`;
* dice groups combined: `d4+d4+d4 => 3d4`;
* modifiers combined: `d6+5+2 => d6+7`;
* no 1dN: `1d6 => d6`;
* no Nd1: `d4+2d1 => d4+2`.

```js
normalize('1d6 - D4 + 2d6 + 3') // 3d6+d4-2
```

## getDiceSet

`getDiceSet(notation: String) => DiceSet`

Accept dice notation string. Returns DiceSet instance providing `notation`, `dice`, `min`, `max` and `mean` properties and `roll`, `stats` and `normalize` methods.
Method `normalize` will normalize notation, create new dice config and return normalized notation.

```js
const diceSet = getDiceSet('d6+d6+3');
diceSet.notation    // d6+d6+3;
diceSet.dice        // [{ count: 1, side: 6 }, { count: 1, side: 6 }, { count: 3, side: 1 }];
diceSet.min         // 5;
diceSet.max         // 15;
diceSet.mean        // 10;
diceSet.roll()      // 5..15;
diceSet.stats()     // ...shows stats
diceSet.normalize() // 2d6+3
```

# Random numbers source

Library uses `Math.random` as random numbers source. Yes, its implementations are highly periodic, and poor sources of random numbers, but it is fast.
