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

  renderButton = () => {
    return <button
      id="showLogin"
      onClick={() => { setTimeout(() => { this.setState({ showForm: true }) }, 400) }} >
      Show login form
      </button>;
  }

  render() {
    return this.state.showForm ? <LoginForm /> : this.renderButton();
  }
}

export default App;
