import React from "react";

const Button = (props) => {
  return (
    <button type="button" className="main-button-wrapper" {...props}>
      {props.children && props.children}
    </button>
  );
};

export default Button;
