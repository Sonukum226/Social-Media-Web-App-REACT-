import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { clearAuthState, login } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();

    //here state is defined of eamil ans password
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailchange = (e) => {
    this.setState({
      email: e.target.value, //retrive the email
    });
  };

  handlePasswordchange = (e) => {
    this.setState({
      password: e.target.value, //retrive the password
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('this.emailInputRef', this.emailInputRef);
    // console.log('this.passwordInputRef', this.passwordInputRef);
    console.log('this.state', this.state);
    const { email, password } = this.state;

    if (email && password) {
      //if there email and password then dispatch the action
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth; //this auth is coming from reducer

    console.log('logged in', isLoggedin);

    if (isLoggedin) {
      //if the user is loged in then redirect to the home page

      return <Redirect to="/" />;
    }

    return (
      <form className="login-form">
        <span className="login-signup-header">Log in</span>
        {error && <div className="alert-error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handleEmailchange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordchange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in....
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              LogIn
            </button>
          )}
        </div>
      </form>
    );
  }
}

function maStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(maStateToProps)(Login);
