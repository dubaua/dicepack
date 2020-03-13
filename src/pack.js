import '@/core/typedef.js';
import distributeDiceArray from '@/core/distributeDiceArray.js';
import isNormalized from '@/core/isNormalized.js';
import maxDiceArray from '@/core/maxDiceArray.js';
import minDiceArray from '@/core/minDiceArray.js';
import normalizeDiceArray from '@/core/normalizeDiceArray.js';
import rollDiceArray from '@/core/rollDiceArray.js';
import toDiceArray from '@/core/toDiceArray.js';
import toNotation from '@/core/toNotation.js';
import getAverage from '@/utils/getAverage.js';
import getDiceArrayComplexity from '@/utils/getDiceArrayComplexity.js';
import sanitize from '@/utils/sanitize.js';

const MAX_COMPLEXITY = 65536;

/** Class representing a set of dice for rolling and statistics */
class DicePack {
  /**
   * Creates an instance of DicePack.
   * @param {string} notation a dice notation
   */

  constructor(notation) {
    /** @type {string} a dice notation */
    this.notation = sanitize(notation);
    /** @type {boolean} */
    this.isNormalized = isNormalized(this.notation);
    /** @type {Array<Dice>} */
    this.dice = toDiceArray(this.notation);
    /** @type {number} */
    this.min = minDiceArray(this.dice);
    /** @type {number} */
    this.max = maxDiceArray(this.dice);
    /** @type {number} */
    this.mean = getAverage(this.min, this.max);
    /** @type {number} */
    this.complexity = getDiceArrayComplexity(this.dice);
    /** @type {Array<Point>} */
    this.distribution = this.complexity <= MAX_COMPLEXITY ? distributeDiceArray(this.dice) : null;
  }

  /**
   * Rolls set of dice, calculating sum of all rolls and return detailed results
   * @return {Detailed} total sum and results for each dice
   */
  roll() {
    return rollDiceArray(this.dice);
  }

  /**
   * Normalizes dice notation have sorted in descending side order, positive count,
   * lowercased, no spaces, no 1dN, no flat dice such as d0, d1, 0dN
   */
  normalize() {
    this.dice = normalizeDiceArray(this.dice);
    this.isNormalized = true;
    this.notation = toNotation(this.dice);
  }

  /**
   * Rolls dice notation, calculating sum of all rolls and return detailed results
   * @param {string} notation dice notation
   * @returns {Detailed} total sum and results for each dice
   */
  static roll(notation) {
    return rollDiceArray(toDiceArray(sanitize(notation)));
  }

  /**
   * Calclulates chance for each result
   * @param {string} notation dice notation
   * @returns {Array<Point>} array of result chances
   */
  static distribute(notation) {
    return distributeDiceArray(toDiceArray(sanitize(notation)));
  }

  /**
   * Normalizes dice notation have sorted in descending side order, positive count,
   * lowercased, no spaces, no 1dN, no flat dice such as d0, d1, 0dN
   * @param {string} notation dice notation
   * @returns {string} normalized notation
   */
  static normalize(notation) {
    return toNotation(normalizeDiceArray(toDiceArray(sanitize(notation))));
  }
}

export default DicePack;
