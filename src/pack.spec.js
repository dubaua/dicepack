// import assert from 'assert';
// import normalize from './normalize.js';

// describe('normalize', function() {
//   describe('returns a string', function() {
//     it('returns result type of string', function() {
//       assert.strictEqual(typeof normalize('2d6+5'), 'string');
//     });
//   });

//   describe('test edge cases', function() {
//     it('trim spaces d12 + d8 => d12+d8', function() {
//       assert.strictEqual(normalize('d12 + d8'), 'd12+d8');
//     });

//     it('lowercase 2D12+3 => 2d12+3', function() {
//       assert.strictEqual(normalize('2D12+3'), '2d12+3');
//     });

//     it('group same side dice d6+d4+2d6 => 3d6+d4', function() {
//       assert.strictEqual(normalize('d6+d4+2d6'), '3d6+d4');
//     });

//     it('order dice by side d12+d8+d10+d4+1+d6+d20 => d20+d12+d10+d8+d6+d4+1', function() {
//       assert.strictEqual(normalize('d12+d8+d10+d4+1+d6+d20'), 'd20+d12+d10+d8+d6+d4+1');
//     });

//     it('remove 1 before 1dN 1d6 => d6', function() {
//       assert.strictEqual(normalize('1d6'), 'd6');
//     });

//     it('convert Nd1 to N 5d1 => 5', function() {
//       assert.strictEqual(normalize('5d1'), '5');
//     });

//     it('convert negative dice to positive with negative modifier -d6 => d6-7', function() {
//       assert.strictEqual(normalize('-d6'), 'd6-7');
//     });

//     it('throws an error on invalid exression passed', function() {
//       assert.throws(function() {
//         normalize('2d');
//       });
//     });
//   });

//   describe('Test some examples', function() {
//     it('d4 + D4+1d4    + d4 => 4d4', function() {
//       assert.strictEqual(normalize('d4 + D4+1d4    + d4'), '4d4');
//     });

//     it('d6-d6-d6   => 3d6-14', function() {
//       assert.strictEqual(normalize('d6-d6-d6  '), '3d6-14');
//     });

//     it('1d1 => 1', function() {
//       assert.strictEqual(normalize('1d1'), '1');
//     });

//     it('-1d1 => -1', function() {
//       assert.strictEqual(normalize('-1d1'), '-1');
//     });

//     it('1d1-1d1 => 0', function() {
//       assert.strictEqual(normalize('1d1-1d1'), '0');
//     });
//   });
// });
// import assert from 'assert';
// import Result from './types/Result.js';
// import Detailed from './types/Detailed.js';
// import roll from './roll.js';

// describe('roll', function() {
//   describe('returns a number', function() {
//     it('returns result type of number', function() {
//       assert.strictEqual(typeof roll('2d12+3d6+5'), 'number');
//     });
//   });

//   describe('result is in range', function() {
//     const result = roll('2d12+3d6+5');
//     const isInRange = 10 <= result && result <= 47;
//     it('result of roll 2d12+3d6+5 is between 10 and 47', function() {
//       assert.strictEqual(isInRange, true);
//     });
//   });

//   describe('returns detailed results if detailed flag given', function() {
//     const result = roll('2d12+3d6+5', true);
//     it('returns result type of Detailed', function() {
//       assert.strictEqual(result instanceof Detailed, true);
//     });

//     const allRollsAreResults = result.rolls.every(roll => roll.every(result => result instanceof Result));
//     it('all resulting rolls are type of Result', function() {
//       assert.strictEqual(allRollsAreResults, true);
//     });

//     it('detailed rolls 2d12+3d6+5 length = 3, count of dice notation parts', function() {
//       assert.strictEqual(result.rolls.length, 3);
//     });

//     const [d12s, d6s, flat] = result.rolls;
//     it('each rolls 2d12+3d6+5 part length is equal to count of notation (2, 3, 1)', function() {
//       assert.strictEqual(d12s.length, 2);
//       assert.strictEqual(d6s.length, 3);
//       assert.strictEqual(flat.length, 1);
//     });
//   });

//   describe('1000 d20 rolls', function() {
//     let rolls = [];
//     for (let i = 0; i < 1000; i++) {
//       rolls.push(roll('d20'));
//     }
//     // An integer in range
//     const isValidResult = x => typeof x === 'number' && Math.round(x) === x && 1 <= x && x <= 20;
//     it('every result in range 1..20', function() {
//       assert.strictEqual(rolls.every(isValidResult), true);
//     });
//   });
// });
