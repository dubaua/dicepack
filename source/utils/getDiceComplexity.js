const getDiceComplexity = dice => dice.reduce((accumulator, { count, side }) => accumulator * Math.pow(side, count), 1);

export default getDiceComplexity;
