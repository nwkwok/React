import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import thunk from 'redux-thunk'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'


const componseEnhancers = 
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || 
compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, componseEnhancers(
  applyMiddleware(thunk)
  ));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
       <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
