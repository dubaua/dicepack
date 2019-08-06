import toDice from './toDice.js';
import minDice from './minDice.js';
import maxDice from './maxDice.js';
import rollDice from './rollDice.js';
import statsDice from './statsDice.js';
import normalize from './normalize.js';
import getDiceComplexity from '../utils/getDiceComplexity.js';
import getAverage from '../utils/getAverage.js';

class DiceSet {
  constructor(notation) {
    this.notation = notation;
    this.dice = toDice(this.notation);
    this.min = minDice(this.dice);
    this.max = maxDice(this.dice);
    this.mean = getAverage(this.min, this.max);
    this.complexity = this.dice.reduce(getDiceComplexity, 1);
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
