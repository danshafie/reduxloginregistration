import axios from 'axios';
//communicates info of url to react router
//also can make changes to url
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';


export function signinUser({email, password}) {
  //redux thunk gives us access to dispatch so we can dispatch actions any time we want
  return function(dispatch) {
    //submit email/password to server
    //axios always returns a promise
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        // if request is good...
        // update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })

        // save JWT - can store it in localstorage so user doesnt need to login in again
        //localstorage is unique to domain
        //setitem = save item to local storage
        //'token' is the key and second argument is the data we want to save
        localStorage.setItem('token', response.data.token)

        // redirect to route /feature
        browserHistory.push('/feature')
      })
      .catch(() => {
        // if request is bad...
        // show error message to user
        dispatch(authError('Bad Login Info!'))
      })
  }
}


export function signupUser({email, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then( response => {
        dispatch({ type: AUTH_USER})

        localStorage.setItem('token', response.data.token)

        browserHistory.push('/feature')
      })
      .catch(response => dispatch(authError('Email already in use!')))
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}


export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}



export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      //include header to have jwt for the request
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(res => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
