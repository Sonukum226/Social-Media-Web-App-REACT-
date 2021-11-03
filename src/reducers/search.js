import { SEARCH_RESULTS_SUCCESS } from '../actions/actionType';

const initialSearchState = {
  results: [],
};
export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.users,
      };

    default:
      return state;
  }
}
