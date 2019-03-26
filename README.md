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
| rolls    | `Array<Number&#124;Array<Number>>` | result of each part rolls |

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

`roll(expression: String, ?detailed: Boolean) => number | Detailed`

Accept dice notation string and optional detailed flag. Return resulting roll as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```
roll("2d6+3")         => 5..15
roll("d6-d4")         => -3..5
roll("6")             => 6
roll("-d6")           => -6..-1
roll("3d12+6d6-d4+3") => 8..74
roll("2d6+3", true) => { result: 9, rolls: [[2, 4], [3]] }
```

## min

`min(expression: String, ?detailed: Boolean) => number | Detailed`

Accept dice notation string and optional detailed flag. Returns minimum possible result for dice notation as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```
min("2d6+3")  => 5
min("-2d6+3") => -9
min("d6-d6")  => -5
min("2d6+3", true)  => { result: 5, rolls: [2, 3] }
```

## max

`max(expression: String, ?detailed: Boolean) => number | Detailed`

Accept dice notation string and optional detailed flag. Returns maximum possible result for dice notation as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```
max("2d6+3")  => 15
max("-2d6+3") => 1
max("d6-d6")  => 5
max("2d6+3", true)  => { result: 15, rolls: [12, 3] }
```

## stats

`stats(expression: String) => Stats`

Accept dice notation string. Returns [Stats](https://github.com/dubaua/roll-expression#stats) including distribution array, average, variance and standart derivation.

```
stats('d6') => {
  "distribution": [
    {
      "result": 1,
      "chance": 0.16666666666666666
    },
    {
      "result": 2,
      "chance": 0.16666666666666666
    },
    {
      "result": 3,
      "chance": 0.16666666666666666
    },
    {
      "result": 4,
      "chance": 0.16666666666666666
    },
    {
      "result": 5,
      "chance": 0.16666666666666666
    },
    {
      "result": 6,
      "chance": 0.16666666666666666
    }
  ],
  "average": 3.5,
  "variance": 2.9166666666666665,
  "standardDeviation": 1.707825127659933
}
```

## toDice

`toDice(expression: String) => Array<Dice>`

Accept dice notation string. Returns array of [Dice](https://github.com/dubaua/roll-expression#dice).

```
toDice("2d6+3") => [
  {count: 2, side: 6},
  {count: 3, side: 1}
]

toDice("d12-3") => [
  {count: 1, side: 12},
  {count: -3, side: 1}
]
```

## rollDice

`rollDice(Array<Dice>, ?detailed: Boolean) => number | Detailed`

Accept [Dice](https://github.com/dubaua/roll-expression#dice) array and optional detailed flag. Return resulting roll as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```
const dice = toDice('3d10+7');
rollDice(dice) => 10..37
rollDice(dice, true) => {
  "result": 24,
  "rolls": [[7, 6, 4], [7]]
}
```

## minDice

`minDice(Array<Dice>, ?detailed: Boolean) => number | Detailed`

Accept [Dice](https://github.com/dubaua/roll-expression#dice) array and optional detailed flag. Returns minimum possible result for dice notation as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```
const dice = toDice('2d8+3');
minDice(dice) => 5
minDice(dice, true) => {
  "result": 5,
  "rolls": [2, 3]
}
```

## maxDice

`maxDice(Array<Dice>, ?detailed: Boolean) => number | Detailed`

Accept [Dice](https://github.com/dubaua/roll-expression#dice) array and optional detailed flag. Returns maximum possible result for dice notation as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```
const dice = toDice('3d10+7');
maxDice(dice) => 37
maxDice(dice, true) => {
  "result": 37,
  "rolls": [30, 7]
}
```

## statsDice

`statsDice(Array<Dice>) => Stats`

Accept [Dice](https://github.com/dubaua/roll-expression#dice) array. Returns [Stats](https://github.com/dubaua/roll-expression#stats) including distribution array, average, variance and standart derivation.

```
const dice = toDice('2d4');
statsDice(dice) => {
  "distribution": [
    {
      "result": 2,
      "chance": 0.0625
    },
    {
      "result": 3,
      "chance": 0.125
    },
    {
      "result": 4,
      "chance": 0.1875
    },
    {
      "result": 5,
      "chance": 0.25
    },
    {
      "result": 6,
      "chance": 0.1875
    },
    {
      "result": 7,
      "chance": 0.125
    },
    {
      "result": 8,
      "chance": 0.0625
    }
  ],
  "average": 5,
  "variance": 2.5,
  "standardDeviation": 1.5811388300841898
}
```

# Random numbers source

Library uses `Math.random` as random numbers source. Yes, its implementations are highly periodic, and poor sources of random numbers, but it is fast.
