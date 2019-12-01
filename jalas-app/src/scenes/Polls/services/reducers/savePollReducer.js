import { handleActions } from 'redux-actions';
import { savePoll } from '../actions/savePollActions';

const savePollReducer = handleActions(
  {
    [savePoll]: (state, { payload: { poll } }) => {
      return ({
        ...state, poll,
      });
    },
  },
  {
    poll: {},
  },
);
export default savePollReducer;
