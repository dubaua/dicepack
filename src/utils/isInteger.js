function isInteger(number) {
  return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
}

export default isInteger;
