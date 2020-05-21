import _ from 'lodash';
import {
  LIST_ITEMS
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_ITEMS:
      console.log(action.payload);
      return { items: action.payload.data.data, totalAmount: action.payload.data.total_amount };
    default:
      return state;
  }
};