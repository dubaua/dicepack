const productTwo = (a, b) => [].concat(...a.map(d => b.map(e => d+e)));
const directProduct = (a, b, ...c) => (b ? directProduct(productTwo(a, b), ...c) : a);

export default directProduct;
