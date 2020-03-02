import collect from '../utils/collect.js';

const maximize = ({ count, side }) => Math.max(count, count * side);

const maxDice = dice => collect(dice.map(maximize));

export default maxDice;
