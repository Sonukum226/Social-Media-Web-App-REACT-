import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { clearAuthState, signup, startSignup } from '../actions/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormatSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
      this.props.dispatch(startSignup());
      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };

  render() {
    const { inProgress, error, isLoggedin } = this.props.auth; //this auth is coming from reducer

    if (isLoggedin) {
      //if the user is Signed in then redirect to the home page
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form">
        <span className="login-signup-header"> Signup</span>
        {error && <div className="alert-error-dailog">{error}</div>}
        <div className="field">
          <input
            type="name"
            placeholder="Name"
            required
            onChange={(e) => this.handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => this.handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => this.handleInputChange('password', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) =>
              this.handleInputChange('confirmPassword', e.target.value)
            }
          />
        </div>
        <div className="field">
          <button onClick={this.onFormatSubmit} disabled={inProgress}>
            SignUp
          </button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ auth }) => ({
  auth,
});

export default connect(mapStatetoProps)(Register);
