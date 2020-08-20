import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./Views/Root";
import { AuthProvider } from "./Auth";

ReactDOM.render(
  <AuthProvider>
    <Root />
  </AuthProvider>,
  document.getElementById("root")
);
