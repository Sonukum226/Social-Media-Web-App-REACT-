import { UPDATE_POSTS } from '../actions/actionType';

// Remember post can be any thing string,integer,{} etc
export default function postMessage(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    default:
      return state;
  }
}
