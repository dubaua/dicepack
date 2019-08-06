const round = function(number, precision = 2) {
  const pow = Math.pow(10, precision);
  return Math.round(number * pow) / pow;
};

export default round;
