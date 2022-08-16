function composeValidators(...validators) {
  return value => {
    let errorText = undefined;
    validators.every(validator => {
      errorText = validator(value);
      return errorText === undefined;
    });
    return errorText;
  }
}

function required(errorText) {
  return value => value ? undefined : errorText;   
}

function matchPattern(pattern, errorText) {
  return value => pattern.test(value) ? undefined : errorText;
}

function minLength(min, errorText) {
  return value => value.length >= min ? undefined : errorText;
}

function maxLength(max, errorText) {
  return value => value.length <= max ? undefined : errorText;
}

function lengthInRange(min, max, errorText) {
  return composeValidators(
    minLength(min, errorText),
    maxLength(max, errorText),
  );
}

export { required, matchPattern, minLength, maxLength, lengthInRange };
export default composeValidators;