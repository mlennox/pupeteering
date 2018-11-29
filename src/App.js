import React, { Component } from 'react';
import LoginForm from './loginForm'
class App extends Component {
  state = {
    showForm: false
  }

  handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  render() {
    return this.state.showForm ? <LoginForm /> : <button id="showLogin" onClick={() => { setTimeout(() => { this.setState({ showForm: true }) }, 200) }} >Show login form</button>;
  }
}

export default App;
