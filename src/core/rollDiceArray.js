import '@/core/typedef.js';
import rollDice from '@/core/rollDice.js';
import collectDiceArray from '@/utils/collectDiceArray.js';

// TODO jsDoc

/**
 *
 *
 * @param {*} diceArray
 * @param {*} detailed
 */

const rollDiceArray = (diceArray, detailed) => collectDiceArray(diceArray.map(rollDice), detailed, diceArray);

export default rollDiceArray;
