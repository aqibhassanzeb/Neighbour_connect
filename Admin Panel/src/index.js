import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./style.css";

const root = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <div className="foo">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  </BrowserRouter>,
  root
);
