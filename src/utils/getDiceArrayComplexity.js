const getDiceArrayComplexity = diceArray =>
  diceArray.reduce((complexity, { count, side }) => complexity * Math.pow(side, Math.abs(count)), 1);

export default getDiceArrayComplexity;
