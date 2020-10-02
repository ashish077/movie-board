import React from "react";
import "./searchButton.css"

const Button = ({ onClick,children }) => (
  <div className="search-button">
    <button onClick={onClick}>{children}</button>
  </div>
)

export default Button;
