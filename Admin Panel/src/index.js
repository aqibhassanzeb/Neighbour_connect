import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./style.css";
let persistor = persistStore(store);

const root = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <div className="foo">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </div>
  </BrowserRouter>,
  root
);
