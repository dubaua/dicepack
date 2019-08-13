const isInteger = number => typeof number === 'number' && isFinite(number) && Math.floor(number) === number;

export default isInteger;
