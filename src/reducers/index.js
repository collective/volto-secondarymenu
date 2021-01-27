/**
 * Secondary menu reducer.
 * @module reducers/secondaryMenuReducer
 */

import { GET_SECONDARY_MENU } from '../actions';

const initialState = {
  error: null,
  hasErrror: false,
  result: [],
  loadingResults: false,
};

export const secondaryMenuReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SECONDARY_MENU}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_SECONDARY_MENU}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_SECONDARY_MENU}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    default:
      return state;
  }
};
