import { combineReducers } from 'redux';
import savePollReducer from '../../scenes/Polls/services/reducers/savePollReducer';

const JalasApp = combineReducers({
  savePollReducer,
});

export default JalasApp;
