import { combineReducers } from 'redux';
import posts from './posts'; // posts coming from reducers
import auth from './auth';

export default combineReducers({
  posts,
  auth,
});
