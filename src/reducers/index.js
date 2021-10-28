import { combineReducers } from 'redux';
import posts from './posts'; // posts coming from reducers posts.js
import auth from './auth';

export default combineReducers({
  posts,
  auth,
});
