import { combineReducers } from 'redux';
import authReduer from './auth';

export default combineReducers({
  auth: authReduer,
});
