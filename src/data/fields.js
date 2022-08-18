import composeValidators, { lengthInRange, matchPattern, required } from "../utils/validator";
import userPosition from "./userPosition";

const fields = {
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  email: {
    name: 'email',
    label: 'Email',
    type: 'email',
    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    name: 'password',
    label: 'Password',
    type: 'password',
    minLength: 8,
    maxLength: 10,
  },
  position: {
    name: 'position',
    label: 'Position',
    type: 'select',
    options: userPosition,
    placeholder: '--Select user position--',
  },
};

const { name, email, password, position } = fields;
fields.name.requiredErrorText = 'Name is required';
fields.email.requiredErrorText = 'Email is required';
fields.email.patternErrorText = 'Email is not valid';
fields.password.requiredErrorText = 'Password is required';
fields.password.minLengthErrorText = `Password must have ${password.minLength}-${password.maxLength} characters`;
fields.position.requiredErrorText = 'Position is required';

fields.name.validator = required(name.requiredErrorText);
fields.email.validator = composeValidators(
  required(email.requiredErrorText),
  matchPattern(email.pattern, email.patternErrorText),
);
fields.password.validator = composeValidators(
  required(password.requiredErrorText),
  lengthInRange(password.minLength, password.maxLength, password.minLengthErrorText),
);
fields.position.validator = required(position.requiredErrorText);

export default fields;
