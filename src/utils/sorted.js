const sorted = (current, index, source) => index === 0 || source[index - 1] > current;

export default sorted;