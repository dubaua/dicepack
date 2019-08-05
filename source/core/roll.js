import rollDice from './rollDice.js';
import toDice from './toDice.js';

const roll = (notation, detailed) => rollDice(toDice(notation), detailed);

export default roll;
