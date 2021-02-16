import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./global.css";
import { unregister } from "./serviceWorker";


ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

unregister();
