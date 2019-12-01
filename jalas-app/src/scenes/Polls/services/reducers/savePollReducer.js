import { handleActions } from 'redux-actions';
import { savePoll } from '../actions/savePollActions';

const savePollReducer = handleActions(
  {
    [savePoll]: (state, { payload: poll }) => ({
      ...state, polls: poll,
    }),
  },
  {
    polls: {},
  },
);
export default savePollReducer;
