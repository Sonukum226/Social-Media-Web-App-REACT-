import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  ADD_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIENDS_SUCCESS,
} from './actionType';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIENDS_SUCCESS,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIENDS_SUCCESS,
    userId,
  };
}
