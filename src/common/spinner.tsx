import React from "react";
import Spinner from "react-bootstrap/Spinner";
const SpinnerContainer = () => (
  <div className="row align-items-center justify-content-center mt-6">
    <Spinner animation="border">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);
export default SpinnerContainer;
