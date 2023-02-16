import React from "react";

const Loader = () => {
  return (
    <div className ="d-flex justify-content-center align-items-center min-vh-100 bg">
      <div className ="spinner-border h-10" style = {{width : '4rem' , height : '4rem'}} role="status">
        <span className ="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
