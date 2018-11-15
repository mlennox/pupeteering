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
            <label>
              Email
              <Field type="email" name="email" placeholder="Please provide your email" />
              <ErrorMessage name="email" render={DisplayErrorMessage} />
            </label>
            <label>
              Password
              <Field type="password" name="password" />
              <ErrorMessage name="password" render={DisplayErrorMessage} />
            </label>
            <label>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </label>
          </Form>)}
      </Formik>
    );
  }
}

export default App;
