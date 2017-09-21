import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './js/reducers'
import './index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
            thunk//,
            // routerAppMiddleware
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
