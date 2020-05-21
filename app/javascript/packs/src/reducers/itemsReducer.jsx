import _ from 'lodash';
import {
  LIST_ITEMS,
  FETCH_ITEMS
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_ITEMS:
      return { items: action.payload.data.data, totalAmount: action.payload.data.total_amount };
    case FETCH_ITEMS:
      return { items: action.payload, totalAmount: 0 }
    default:
      return state;
  }
};