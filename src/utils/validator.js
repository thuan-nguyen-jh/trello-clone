function composeValidators(...validators) {
  return value => {
    for (const validator of validators) {
      const errorMessage = validator(value);
      if (errorMessage !== undefined) {
        return errorMessage;
      }
    }
    return undefined;
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
  if (min === undefined && max === undefined) {
    return value => undefined;
  }
  if (min === undefined) {
    return maxLength(max, errorText);
  }
  if (max === undefined) {
    return minLength(min, errorText);
  }

  return composeValidators(
    minLength(min, errorText),
    maxLength(max, errorText),
  );
}

export { required, matchPattern, minLength, maxLength, lengthInRange };
export default composeValidators;