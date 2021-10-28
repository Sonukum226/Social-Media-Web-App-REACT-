/*Reducer are pure functions that take current state and action as argument and return a new state(after that it sends to store) */

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
