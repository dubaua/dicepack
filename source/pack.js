import distributeDice from './core/distributeDice.js';
import isNormalized from './core/isNormalized.js';
import maxDice from './core/maxDice.js';
import minDice from './core/minDice.js';
import normalizeDice from './core/normalizeDice.js';
import rollDice from './core/rollDice.js';
import toDice from './core/toDice.js';
import toNotation from './core/toNotation.js';
import getAverage from './utils/getAverage.js';
import getDiceComplexity from './utils/getDiceComplexity.js';
import sanitize from './utils/sanitize.js';

class DicePack {
  constructor(notation) {
    this.notation = notation;
    this.dice = toDice(sanitize(this.notation));
    this.min = minDice(this.dice);
    this.max = maxDice(this.dice);
    this.mean = getAverage(this.min, this.max);
    this.complexity = getDiceComplexity(this.dice);
    this.isNormalized = isNormalized(this.notation);

    this.roll = detailed => rollDice(this.dice, detailed);
    // todo save distribution
    this.distribute = () => distributeDice(this.dice);
    // todo log
    this.normalize = () => {
      this.dice = normalizeDice(this.dice);
      this.isNormalized = true;
      return (this.notation = toNotation(this.dice));
    };
  }
}

const pack = notation => new DicePack(notation);

export default pack;
