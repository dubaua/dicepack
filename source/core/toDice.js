import getDice from './getDice.js';
import validate from '../utils/validate.js';

const NOTATION_REGEXP = /^((-?)(\d+|\d*d\d+))([+-](\d+|\d*d\d+))*$/;

const toDice = notation =>
  validate(notation, NOTATION_REGEXP)
    .replace(/-/g, '+-')
    .split('+')
    .filter(string => string !== '')
    .map(getDice);

export default toDice;
