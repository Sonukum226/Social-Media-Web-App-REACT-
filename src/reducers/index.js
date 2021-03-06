import { combineReducers } from 'redux';
import posts from './posts'; // posts coming from reducers posts.js
import auth from './auth';
import profile from './profile';
import friends from './friends';
import search from './search';

export default combineReducers({
  posts,
  auth,
  profile,
  friends,
  search,
});
