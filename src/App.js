import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./App.css"

const DisplayErrorMessage = message => <span className="error">{message}</span>

class App extends Component {
  handleValidation = values => {
    let errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  }
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
        validate={this.handleValidation}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label data-testid="email_label">
              Email
              <Field data-testid="email" type="email" name="email" placeholder="Please provide your email" />
              <ErrorMessage name="email" render={DisplayErrorMessage} />
            </label>
            <label data-testid="password_label">
              Password
              <Field data-testid="password" type="password" name="password" />
              <ErrorMessage name="password" render={DisplayErrorMessage} />
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

export default App;
