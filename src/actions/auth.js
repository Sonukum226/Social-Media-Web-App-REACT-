import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage, getFromBody } from '../helpers/utils';
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESSFUL,
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
          localStorage.setItem('token', data.data.token);
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

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

//if the user edit the name ans password
export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFromBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Edit Profile data', data);

        if (data.success) {
          dispatch(editUserSuccessful(data.data.user));

          //jwt token is important to update after editing name beacause if not updated then token remain same as prevoiusly
          //and at the time of login it will show error
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }

          return;
        }

        dispatch(editUserFailed(data.message));
      });
  };
}
