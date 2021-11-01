import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from './actionType';

export function startUSerProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function UserProfileSucess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function UserProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

//here fetching the user id
export function fetchUSerProfile(userId) {
  return (dispatch) => {
    dispatch(startUSerProfileFetch());

    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(UserProfileSucess(data.data.user));
          return;
        }

        dispatch(UserProfileFailed(data.message));
      });
  };
}
