import React from "react";
import "./normal-button.css";

function NormalButton({ text, onClickFunc }) {
  return (
    <button className="login-btn" onClick={onClickFunc}>
      {text}
    </button>
  );
}

export default NormalButton;
