import distributeDiceArray from './core/distributeDiceArray.js';
import isNormalized from './core/isNormalized.js';
import maxDiceArray from './core/maxDiceArray.js';
import minDiceArray from './core/minDiceArray.js';
import normalizeDiceArray from './core/normalizeDiceArray.js';
import rollDiceArray from './core/rollDiceArray.js';
import toDiceArray from './core/toDiceArray.js';
import toNotation from './core/toNotation.js';
import getAverage from './utils/getAverage.js';
import getDiceArrayComplexity from './utils/getDiceArrayComplexity.js';
import sanitize from './utils/sanitize.js';

/**
 *
 *
 * @class DicePack
 */
class DicePack {
  /**
   *Creates an instance of DicePack.
   * @param {string} notation dice notation
   * @memberof DicePack
   */
  constructor(notation) {
    this.notation = notation;
    this.dice = toDiceArray(sanitize(this.notation));
    this.min = minDiceArray(this.dice);
    this.max = maxDiceArray(this.dice);
    this.mean = getAverage(this.min, this.max);
    this.complexity = getDiceArrayComplexity(this.dice);
    this.isNormalized = isNormalized(this.notation);

    this.roll = detailed => rollDiceArray(this.dice, detailed);

    // calculate distribution once, then access saved
    let distribution = null;
    Object.defineProperty(this, 'distribution', {
      get() {
        if (!distribution) {
          distribution = distributeDiceArray(this.dice);
        }
        return distribution;
      },
    });

    this.normalize = () => {
      this.dice = normalizeDiceArray(this.dice);
      this.isNormalized = true;
      return (this.notation = toNotation(this.dice));
    };
  }
}

const roll = (notation, detailed) => rollDiceArray(toDiceArray(sanitize(notation)), detailed);
const distribute = notation => distributeDiceArray(toDiceArray(sanitize(notation)));
const normalize = notation => normalizeDiceArray(toDiceArray(sanitize(notation)));

export { DicePack, roll, distribute, normalize };
