import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from '../actions/actionType';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false, //intially
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    //1st case
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };

    default:
      return state;
  }
}
