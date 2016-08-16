import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';



const rootReducer = combineReducers({
  //form property of state will be produced by reducer aka form from redux-form
  form,
  //this becomes state.auth.(whatever is in the return case in the reducer)
  auth: authReducer
});

export default rootReducer;
