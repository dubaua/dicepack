import isNormalized from './isNormalized.js';
import toDice from './toDice.js';

const normalize = notation =>
  isNormalized(notation)
    ? notation
    : toDice(notation.replace(/\s/g, '').toLowerCase())
        .reduce((accumulator, { count, side }) => {
          if (side !== 1 && count < 0) {
            // turn positive
            accumulator.push({ count: Math.abs(count), side });
            // adjust negative modifier
            accumulator.push({ count: count * (side + 1), side: 1 });
          } else {
            // push as is
            accumulator.push({ count, side });
          }
          return accumulator;
        }, [])
        .sort((a, b) => b.side - a.side)
        .reduce((accumulator, { count, side }) => {
          // group same sided dice
          if (accumulator.length && side === accumulator[accumulator.length - 1].side) {
            accumulator[accumulator.length - 1].count += count;
          } else {
            accumulator.push({ count, side });
          }
          return accumulator;
        }, [])
        // turn to string array
        .map(
          ({ side, count }) =>
            `${count < 0 ? '-' : ''}${Math.abs(count) === 1 && side !== 1 ? '' : Math.abs(count)}${
              side !== 1 ? 'd' + side : ''
            }`
        )
        .join('+')
        .replace('+-', '-');

export default normalize;
