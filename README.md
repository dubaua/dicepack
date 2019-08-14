# Simple dice notation roller

Provides set of methods for rolling dice notation strings. There are many other dice roller implementations, but if lovesong already exist that doesn't mean you shouldn't write own one.

# Where can it be useful?

Dice expressions are an universal description of nonlinear probabilities. That probabilities can be used to generate animations. In the example, the x position of the star distributed evenly, while the y position is nonlinear. Stars are generated more often closer to the vertical center of the screen.

# Usage

DicePack instance gives you access to following properties and methods

```js
import { DicePack } from 'pack-dice';

const meleeAttackDamage = new DicePack('d6+d6+3');

meleeAttackDamage.min; // 5
meleeAttackDamage.max; // 15
meleeAttackDamage.mean; // 10
meleeAttackDamage.complexity; // 36 possible combinations
meleeAttackDamage.distribution; // distrubution array
meleeAttackDamage.isNormalized; // false
meleeAttackDamage.notation; // d6+d6+3
meleeAttackDamage.roll(); // 5..15
meleeAttackDamage.roll(true); // => Detailed
meleeAttackDamage.normalize(); // => 2d6+3
```

## Properties

| property     | type                    | description                                          |
| ------------ | ----------------------- | ---------------------------------------------------- |
| min          | `Number`                | minimum possible result                              |
| max          | `Number`                | maximum possible result                              |
| mean         | `Number`                | average result                                       |
| complexity   | `Number`                | number of possible combinations                      |
| distribution | `Array<result, chance>` | distribution array describing chance for each result |
| isNormalized | `Bollean`               | number of possible combinations                      |
| notation     | `String`                | current notation                                     |

## Methods

| method    | parameters | return              | description                                                                                                                                         |
| --------- | ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| roll      | `Boolean`  | `Number | Detailed` | resulting number or detailed results if flag given                                                                                                  |
| normalize |            | `String`            | [normalized](https://github.com/dubaua/roll-expression#normalize) notation. Also turns `isNormalized` property true and updates `notation` property |

You can use following methods separately

## roll

`roll(notation: String, ?detailed: Boolean) => Number | Detailed`

Accepts dice notation string and optional detailed flag. Return resulting roll as number or [Detailed](https://github.com/dubaua/roll-expression#detailed) if flag given.

```js
import { roll } from 'pack-dice';

roll('2d6+3'); // 5..15
roll('d6-d4'); // -3..5
roll('6'); // 6
roll('-d6'); // -6..-1
roll('3d12+6d6-d4+3'); // 8..74
roll('2d6+3', true);
/*
{
  result: 10,
  rolls: [
    [
      { side: 6, roll: 5, },
      { side: 6, roll: 2, },
    ],
    [
      { side: 1, roll: 3, },
    ],
  ],
}
*/
```

## distribute

`distribute(notation: String) => Array<result, chance>`

Accepts dice notation string. Returns distribution array describing chance for each result.

```js
import { distribute } from 'pack-dice';

distribute('d6');
/*
[
  { result: 1, chance: 0.16666666666666666, },
  { result: 2, chance: 0.16666666666666666, },
  { result: 3, chance: 0.16666666666666666, },
  { result: 4, chance: 0.16666666666666666, },
  { result: 5, chance: 0.16666666666666666, },
  { result: 6, chance: 0.16666666666666666, },
]
*/
```

## normalize

`normalize(notation: String) => String`

Accepts dice notation string. Return normalized dice notation string.
Normalized dice notation have following restrictions:

- no spaces: `2d6 + 3 => 2d6+3`;
- no uppercase: `D20 => d20`;
- only positive dice groups: `-d6 => d6-7`;
- dice groups ordered by side: `d4+d10 => d10+d4`;
- dice groups combined: `d4+d4+d4 => 3d4`;
- modifiers combined: `d6+5+2 => d6+7`;
- no 1dN: `1d6 => d6`;
- no Nd1: `d4+2d1 => d4+2`.

```js
import { normalize } from 'pack-dice';

normalize('1d6 - D4 + 2d6 + 3'); // 3d6+d4-2
```

# Types

## Detailed

Detailed shows sum of rolls and result for each dice group. Side property shows range, roll shows result.

| property | type                       | description                 |
| -------- | -------------------------- | --------------------------- |
| result   | `Number`                   | sum of all rolls, integer   |
| rolls    | `Array<Array<side, roll>>` | results for each dice group |

# Random numbers source

Library uses `Math.random` as random numbers source. Yes, its implementations are highly periodic, and poor sources of random numbers, but it is fast.
