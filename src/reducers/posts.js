/*Reducer are pure functions that take current state and action as argument and return a new state(after that it sends to store) */

import {
  ADD_COMMENT,
  ADD_POST,
  UPDATE_POSTS,
  UPDATE_POST_LIKE,
} from '../actions/actionType';

// Remember post can be any thing string,integer,{} etc
export default function postMessage(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;

    case ADD_POST:
      return [action.post, ...state];

    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;

    case UPDATE_POST_LIKE:
      const updatePosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return updatePosts;

    default:
      return state;
  }
}
