import { RECEIVED_SHOUTS } from '../constants';

const initialState = [];

const actionsMap = {
  [RECEIVED_SHOUTS]: (state, action) => action.shouts
};

export default function shouts(state = initialState, action) {
  const fn = actionsMap[action.type];
  if (!fn) {
    return state;
  }
  return fn(state, action);
}
