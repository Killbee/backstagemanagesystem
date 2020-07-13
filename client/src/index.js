import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

const product = storageUtils.getProduct() || {};
// memoryUtils.user = user
memoryUtils.product = product;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
