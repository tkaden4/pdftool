import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const el = document.getElementById("react-app");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  el
);
