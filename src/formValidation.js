import React from 'react';

/**
 * Rinky-dink form validation
 * @param {object} values - the form values
 */
export const handleValidation = values => {
  let errors = {};
  if (!values.email) {
    errors.email = errorMessages.email.required;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = errorMessages.email.invalid;
  }
  if (!values.password) {
    errors.password = errorMessages.password.required;
  }
  return errors;
}

/**
 * Should really use ProviderIntl 
 */
export const errorMessages = {
  email: {
    required: 'You must provide an email address',
    invalid: 'Invalid email address'
  },
  password: {
    required: 'You must provide a password'
  }
}

export const displayErrorMessage = message => <span className="error">{message}</span>