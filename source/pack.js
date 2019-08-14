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

    // calculate distribution once, then access saved
    let distribution = null;
    Object.defineProperty(this, 'distribution', {
      get() {
        if (!distribution) {
          distribution = distributeDice(this.dice);
        }
        return distribution;
      },
    });

    this.normalize = () => {
      this.dice = normalizeDice(this.dice);
      this.isNormalized = true;
      return (this.notation = toNotation(this.dice));
    };
  }
}

const roll = (notation, detailed) => rollDice(toDice(sanitize(notation)), detailed);
const distribute = notation => distributeDice(toDice(sanitize(notation)));
const normalize = notation => normalizeDice(toDice(sanitize(notation)));

export { DicePack, roll, distribute, normalize };
