import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import SearchApp from './search';
const renderApp = () => {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <Router>
      <SearchApp />
    </Router>,
    rootElement
  );
};
renderApp();

//app to work offline and load faster
registerServiceWorker();
