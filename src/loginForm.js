import React, { Component, Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./App.css"
import { handleValidation, displayErrorMessage } from './formValidation';

class LoginFormClass extends Component {
  state = {
    loggedIn: false
  }

  submitForm = (values) => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(data => {
        console.log(`success - response : ${data}`);
        this.setState({ loggedIn: true });
      })
      .catch((error) => {
        console.error(`failed - error :  ${error}`);
      });
  }

  handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      // we want to pop a dialog, but also choose to submit the form
      // very contrived, only to show testing dialog
      if (window.confirm(JSON.stringify(values, null, 2))) {
        this.submitForm(values);
      }
    }, 400);
  }
  render() {
    return (
      <Fragment>
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
        {this.state.loggedIn && <h2>You logged in successfully</h2>}
      </Fragment>
    );
  }
}

export default LoginFormClass;
