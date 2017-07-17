import { combineReducers } from 'redux';

export default (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    default:
      return state;
  }
};
