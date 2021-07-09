import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
const AppHOC = (AppComponent) => {
  return () => {
    return (
      <Router>
        <AppComponent />
      </Router>
    );
  };
};

export default AppHOC;
