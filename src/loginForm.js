import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./App.css"
import { handleValidation, displayErrorMessage } from './formValidation';

class LoginFormClass extends Component {

  handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={handleValidation}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label data-testid="email_label">
              Email
              <Field data-testid="email" type="email" name="email" placeholder="Please provide your email" />
              <ErrorMessage name="email" render={displayErrorMessage} />
            </label>
            <label data-testid="password_label">
              Password
              <Field data-testid="password" type="password" name="password" />
              <ErrorMessage name="password" render={displayErrorMessage} />
            </label>
            <label>
              <button data-testid="submit" type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </label>
          </Form>)}
      </Formik>
    );
  }
}

export default LoginFormClass;
