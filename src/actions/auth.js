import { APIUrls } from '../helpers/urls';
import { getFromBody } from '../helpers/utils';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionType';

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

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin()); //to set my progress
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
