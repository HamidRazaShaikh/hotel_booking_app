import React from "react";

export const LoaderUtils = () => {
  return (
    <div
      className="spinner-grow"
      style={{ width: "1rem", height: "1rem" }}
      role="status"
    ></div>
  );
};

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg">
      <div
        className="spinner-border h-10"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
