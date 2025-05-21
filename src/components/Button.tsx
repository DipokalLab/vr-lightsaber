import React from "react";

type ButtonType = {
  children?: any;
  isActive?: boolean;
  onClick?: any;
};

const Button = ({ children, isActive = false, onClick }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      style={{
        outline: "none",
        border: "1px solid rgb(255, 255, 255)",
        backgroundColor: isActive ? "#ffffff" : "transparent",
        color: isActive ? "#000000" : "#ffffff",
        padding: "0.8rem 1rem",
        borderRadius: "4px",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
