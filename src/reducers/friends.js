import {
  ADD_FRIENDS_SUCCESS,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIENDS_SUCCESS,
} from '../actions/actionType';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];

    case ADD_FRIENDS_SUCCESS:
      return state.concat(action.friend);

    case REMOVE_FRIENDS_SUCCESS:
      const newArr = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArr;

    default:
      return state;
  }
}
