import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
