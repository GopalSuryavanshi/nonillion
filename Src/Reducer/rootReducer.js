// rootReducer.js
import { combineReducers } from 'redux';
import catReducer from './reducer';

const rootReducer = combineReducers({
  cat: catReducer,
});

export default rootReducer;
