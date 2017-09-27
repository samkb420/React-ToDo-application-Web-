import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './js/reducers'
import './index.css';
import { AppContainer } from 'react-hot-loader'; // required
import App from './js/App';
// import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root'));
}

renderApp();

if (module.hot) {
  // Renders App every time a change in code happens.
  module.hot.accept('./js/App.js', renderApp);
}

// registerServiceWorker();
