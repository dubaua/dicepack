const unique = (accumulator, current) => [...accumulator, ...(accumulator.indexOf(current) !== -1 ? [] : [current])];

export default unique;
