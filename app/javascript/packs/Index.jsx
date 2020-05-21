import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import App from '../components/App';
import reducers from './src/reducers';
import ReactDOM from 'react-dom';

const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  componseEnhancers(applyMiddleware(reduxThunk))
);

document.addEventListener("DOMContentLoaded", () => {
  console.log(store.getState());
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});