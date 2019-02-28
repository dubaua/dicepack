# Simple dice notation roller

Provides set of methods for rolling dice notation strings. 


## roll

Accept notation and optional detailed flag. Return resulting roll as number. Return detailed result if detailed flag given

```
roll("2d6+3") => 9
roll("d6-d4") => 3
roll("6") => 6
roll("-d6") => -4
roll("3d12+6d6-d4+3") => 28
```


## min

Accept notation and optional detailed flag. Returns minimum possible result for dice notation. Return detailed result if detailed flag given

```
min("2d6+3") => 5
min("-2d6+3") => -9
min(d6-d6) => -5
```


## max

Accept notation and optional detailed flag. Returns maximum possible result for dice notation. Return detailed result if detailed flag given

```
max("2d6+3") => 15
max("-2d6+3") => 1
max(d6-d6) => 5
```


## Dice object

Dice object describes how to roll single notation part.

| property | type   | description                        |
|----------|--------|------------------------------------|
| count    | Number | how much repeat roll, positive int |
| side     | Number | dice range, positive int           |
| sign     | Number | represent sign, 1 or -1            |


## parse

Accept notation. Returns array of Dice objects. 

```
parse("2d6+3") => [ {count: 2, side: 6, sign: 1}, {count: 3, side: 1, sign: 1} ]
parse("d12-3") => [ {count: 1, side: 12, sign: 1}, {count: 3, side: 1, sign: -1} ]
```


## rollDice

Accept Dice array and optional detailed flag. Return resulting roll as number and detailed result if detailed flag given

```
const dice = [
  {
    count: 3,
    side: 10,
    sign: 1,
  },
  {
    count: 7,
    side: 1,
    sign: 1,
  },
];

rollDice(dice) => 22
```


## minDice

Accept Dice array and optional detailed flag. Returns minimum possible result for Dice array. Return detailed result if detailed flag given

```
const dice = [
  {
    count: 3,
    side: 10,
    sign: 1,
  },
  {
    count: 7,
    side: 1,
    sign: 1,
  },
];

minDice(Dice) => 10
```


## maxDice

Accept Dice array and optional detailed flag. Returns maximum possible result for Dice array. Return detailed result if detailed flag given

```
const dice = [
  {
    count: 3,
    side: 10,
    sign: 1,
  },
  {
    count: 7,
    side: 1,
    sign: 1,
  },
];

rollDice(dice) => 37
```

## detailed flag

These methods `roll`, `min`, `max`, `rollDice`, `minDice`, `maxDice`,accepts optional  flag as second argument to return detailed results.

```
roll("2d6+3", true) => { result: 9, rolls: [2, 4, 3] }
```

## Random numbers source

Library uses `Math.random` as random numbers source. Yes, its implementations are highly periodic, and poor sources of random numbers, but its fast.