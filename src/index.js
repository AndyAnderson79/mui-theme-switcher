import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import App from './App';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);