import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
} from '../actions/actionType';

const initialProfileObject = {
  user: {},
  error: null,
  success: null,
  inprogres: false,
};

// Remember post can be any thing string,integer,{} etc
export default function profile(state = initialProfileObject, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        user: action.user,
        inprogres: false,
      };

    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        inprogres: false,
      };

    case FETCH_USER_PROFILE:
      return {
        ...state,
        inprogres: true,
      };

    default:
      return state;
  }
}
