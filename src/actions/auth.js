import { APIUrls } from '../helpers/urls';
import { getFromBody } from '../helpers/utils';
import { LOGIN_START } from './actionType';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  return (dispatch) => {
    const url = APIUrls.login;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFromBody({ email, password }),
    });
  };
}
