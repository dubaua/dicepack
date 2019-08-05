import toDice from './toDice.js';
import minDice from './minDice.js';
import maxDice from './maxDice.js';
import rollDice from './rollDice.js';
import statsDice from './statsDice.js';
import normalize from './normalize.js';

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

export default getDiceSet;
