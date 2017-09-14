import {
    POLICIES_REQUEST,
    POLICIES_SUCCESS,
    POLICIES_FAILURE
} from '../consts';

import Immutable from 'foremanNodeModules/seamless-immutable';

const initialState = Immutable({});

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case POLICIES_REQUEST:
    case POLICIES_SUCCESS:
      return state.set(
        'list',
        payload.results
      );
    case POLICIES_FAILURE:
      return state.set(
        { error: payload.error }
      )
    default:
      return state;
  }
};
