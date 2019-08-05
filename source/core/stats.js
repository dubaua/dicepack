import statsDice from './statsDice.js';
import toDice from './toDice.js';

const stats = notation => statsDice(toDice(notation));

export default stats;
