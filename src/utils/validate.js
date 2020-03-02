function validate(string, regexp) {
  if (typeof string !== 'string' || !regexp.test(string)) {
    throw new Error(`Given notation ${string} isn't valid`);
  }
  return string;
}

export default validate;
