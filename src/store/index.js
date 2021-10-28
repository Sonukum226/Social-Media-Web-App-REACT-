import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers';

let store;
export function configureStore() {
  store = createStore(reducer, applyMiddleware(thunk, logger));

  return store;
}

/*  All about create store and working (Library form redux)
  
Creates a Redux store that holds the state tree. The only way to change the data in the store is to call dispatch() on it.

There should only be a single store in your app. To specify how different parts of the state tree respond to actions, you may
 combine several reducers into a single reducer function by using combineReducers.

 return::-A Redux store that lets you read the state, dispatch actions and subscribe to changes.

*/
