import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOG_OUT,
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
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:  
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };

    case LOGIN_FAILED:
    case SIGNUP_FAILED:  
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };

      case AUTHENTICATE_USER:
        return{
          ...state,
          user:action.user,
          isLoggedin:true,
        };

      case LOG_OUT:
        return{
          ...state,
          user:{},
          isLoggedin:false,
        };

    default:
      return state;
  }
}
