const getDiceComplexity = diceArray =>
  diceArray.reduce((complexity, { count, side }) => complexity * Math.pow(side, count), 1);

export default getDiceComplexity;
