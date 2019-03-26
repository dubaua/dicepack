# Simple dice notation roller

Provides set of methods for rolling dice notation strings.

# Types

## Dice

Dice describes how to roll single dice notation.

| property | type     | description                                      |
| -------- | -------- | ------------------------------------------------ |
| count    | `Number` | represents roll count and sign, non zero integer |
| side     | `Number` | dice range, positive integer                     |

## Detailed

Detailed shows resulting number and show each roll result.

| property | type                           | description               |
| -------- | -------------------------------| ------------------------- |
| result   | `Number`                       | sum of all rolls, integer |
| rolls    | `Array<Number\|Array<Number>>` | result of each part rolls |

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

```
roll('2d6+3')         => 5..15
roll('d6-d4')         => -3..5
roll('6')             => 6
roll('-d6')           => -6..-1
roll('3d12+6d6-d4+3') => 8..74
roll('2d6+3', true)   => { result: 9, rolls: [[2, 4], [3]] }
```

## min

`min(notation: String, ?detailed: Boolean) => number | Detailed`

Accept dice notation string and optional detailed flag. Returns minimum possible result for dice notation as number.

```
min('2d6+3')  => 5
min('-2d6+3') => -9
min('d6-d6')  => -5
```

## max

`max(notation: String, ?detailed: Boolean) => number | Detailed`

Accept dice notation string and optional detailed flag. Returns maximum possible result for dice notation as number.

```
max('2d6+3')  => 15
max('-2d6+3') => 1
max('d6-d6')  => 5
```

## stats

`stats(notation: String) => Stats`

Accept dice notation string. Returns [Stats](https://github.com/dubaua/roll-expression#stats) including distribution array, average, variance and standart derivation.

```
stats('d6') => {
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
```

## getDiceSet

`getDiceSet(notation: String) => DiceSet`

Accept dice notation string. Returns DiceSet class that provides calculated min, max and mean properties and roll and stats methods.

```
const diceSet = getDiceSet('2d6+3');
diceSet.min     => 5;
diceSet.max     => 15;
diceSet.mean    => 10;
diceSet.roll()  => 5..15;
diceSet.stats() => {
  'distribution': [
    {
      'result': 5,
      'chance': 0.027777777777777776
    },
    {
      'result': 6,
      'chance': 0.05555555555555555
    },
    {
      'result': 7,
      'chance': 0.08333333333333333
    },
    {
      'result': 8,
      'chance': 0.1111111111111111
    },
    {
      'result': 9,
      'chance': 0.1388888888888889
    },
    {
      'result': 10,
      'chance': 0.16666666666666669
    },
    {
      'result': 11,
      'chance': 0.1388888888888889
    },
    {
      'result': 12,
      'chance': 0.1111111111111111
    },
    {
      'result': 13,
      'chance': 0.08333333333333333
    },
    {
      'result': 14,
      'chance': 0.05555555555555555
    },
    {
      'result': 15,
      'chance': 0.027777777777777776
    }
  ],
  'average': 10,
  'variance': 5.833333333333333,
  'standardDeviation': 2.41522945769824
};
```

# Random numbers source

Library uses `Math.random` as random numbers source. Yes, its implementations are highly periodic, and poor sources of random numbers, but it is fast.
