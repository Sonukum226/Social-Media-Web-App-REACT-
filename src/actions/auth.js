import { APIUrls } from '../helpers/urls';
import { getFromBody } from '../helpers/utils';
import {
  AUTHENTICATE_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from './actionType';

//this will execute when login is start
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

//this will exectute when login is successful
export function loginSuccessful(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

//this will execute when Login is failed
export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

//FOR LOGIN
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin()); //to set my progress for login
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFromBody({ email, password }),
    })
      .then((response) => response.json()) //it will return the data in json format if promise is successful
      .then((data) => {
        console.log('data', data);

        if (data.success) {
          //dispatch action to save user
          dispatch(loginSuccessful(data.data.user));
          return;
        }
        //if it's not successful

        dispatch(loginFailed(data.message));
      });
  };
}

/*   
                MORE ABOUT then() function
Attaches callbacks for the resolution and/or rejection of the Promise.

@param onfulfilled — The callback to execute when the Promise is resolved.

@param onrejected — The callback to execute when the Promise is rejected.

@returns — A Promise for the completion of which ever callback is executed.
*/

// for signup

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFromBody({
        //getting information
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //do something
        if (data.success) {
          //if success
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccessful(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message)); //if failed
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function authenticate_user(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
