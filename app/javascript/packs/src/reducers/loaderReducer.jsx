import {
  CHECKOUT_LOADER
} from '../actions/types';

const INITIAL_STATE = {
  checkoutLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECKOUT_LOADER:
      return { ...state, checkoutLoading: !state.checkoutLoading };
    default:
      return state;
  }
};