function addProperty({ value, key, validator, description, context }) {
  if (typeof value === 'undefined') {
    throw new TypeError(`${key} is required`);
  }
  if (typeof validator === 'function' && validator(value)) {
    context[key] = value;
  } else {
    throw new TypeError(`expected ${key} is ${description}, got ${typeof value} ${value}.`);
  }
}

export default addProperty;
