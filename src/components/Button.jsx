import React from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className="btn">
      {props.value}
    </button>
  );
};

export default Button;
