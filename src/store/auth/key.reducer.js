import produce from 'immer';
import * as types from './key.types';

const initialState = {
  accessKey: '',
};

export const key = (state = initialState, action) => {
  const { type, payload } = action;
  return produce(state, (draft) => {
    switch (type) {
      case types.GET_KEY_SUCCESS:
        draft.accessKey = payload.access_key;
        break;
      case types.CREATE_KEY_SUCCESS:
        draft.accessKey = payload.api_access_key;
        break;
      default:
        return state;
    }
  });
};
