import { FormikErrors } from 'formik';

import { CreateUserValues, LoginValues } from './Login.models';

export const validateLogIn = (values: LoginValues) => {
  const errors: FormikErrors<LoginValues> = {};
  if (!values.username) {
    errors.username = 'Username is required';
  }

  if (!values.password) {
    errors.password = 'Enter a password';
  }

  return errors;
};

export const validateCreateUser = (values: CreateUserValues) => {
  const errors: FormikErrors<CreateUserValues> = {};
  if (!values.email) {
    errors.email = 'Email an email.';
  }

  if (!values.password) {
    errors.password = 'Enter a password.';
  }

  if (!values.name) {
    errors.name = 'Enter a name.';
  }

  return errors;
};
