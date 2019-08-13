import Dice from '../types/Dice.js';

function validateDiceArray(dice) {
  if (!dice.every(die => die instanceof Dice)) {
    throw new Error(`Given dice array ${dice} contains elements type of differs from Dice.`);
  } else {
    return dice;
  }
}

export default validateDiceArray;
