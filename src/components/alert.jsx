import React from "react";

const Alert = ({ title, message }) => {
  return (
    <div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">{title}</h4>
      <p>{message}</p>
      <hr />
    </div>
  );
};

export default Alert;
