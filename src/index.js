import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./redux/reducers";
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { composeWithDevTools } from 'redux-devtools-extension'
import "bootstrap/dist/js/bootstrap.js";
import ReduxThunk from 'redux-thunk';

// const store = createStore(reducers, compose(applyMiddleware(thunk)))
const middlewares = [ReduxThunk];

const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares)),
);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
