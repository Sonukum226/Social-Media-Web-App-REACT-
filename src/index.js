//main index.js
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App'; //my app is coming from compponent folder
import { configureStore } from './store';

const store = configureStore();
console.log('store', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
