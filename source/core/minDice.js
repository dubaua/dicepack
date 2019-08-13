import collect from '../utils/collect.js';

const minimize = ({ count, side }) => Math.min(count, count * side);

const minDice = dice => collect(dice.map(minimize));

export default minDice;
