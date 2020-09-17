import { combineReducers } from 'redux';
import authReduer from './auth';
import passReduer from './pass';

export default combineReducers({
  auth: authReduer,
  pass: passReduer,
});
