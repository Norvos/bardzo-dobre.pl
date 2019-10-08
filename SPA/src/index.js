import React from "react";
import ReactDOM from "react-dom";
import App from "./layouts/App";


import cartReducer from "./reducers/CartReducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

import './helpers/FontawesomeConfig';
import './helpers/AlertifyConfig';
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(cartReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
