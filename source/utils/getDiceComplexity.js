const getDiceComplexity = (accumulator, current) => accumulator * Math.pow(current.side, current.count);

export default getDiceComplexity;
