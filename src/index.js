import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import { AUTH_USER } from './actions/types';

import reducers from './reducers';

//need to apply middleware (reduxthunk) to our store to be able to use it
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

//this is the store that keeps all our application state
//store also contains the dispatch
const store = createStoreWithMiddleware(reducers);

//get the token from localstorage so we can do a check
const token = localStorage.getItem('token');

//if theres a token - the user is signed in
if(token) {
  store.dispatch({ type: AUTH_USER })
}


ReactDOM.render(
  //make sure we pass store from above to provider
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        //IndexRoute only gets shown with the home route
        <IndexRoute component={Welcome} />
        <Route path='signin' component={Signin} />
        <Route path='signout' component={Signout} />
        <Route path='signup' component={Signup} />
        <Route path='feature' component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
