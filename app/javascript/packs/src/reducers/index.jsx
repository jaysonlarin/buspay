import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import loaderReducer from './loaderReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  items: itemsReducer,
  form: formReducer,
  loader: loaderReducer
});