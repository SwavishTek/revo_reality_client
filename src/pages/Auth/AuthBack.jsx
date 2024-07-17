import React from "react";
import "../../style/AuthBackground.css"; // Import the CSS file
import imageUrl from "../../assets/AuthBack.png";

const AuthBack = ({ children }) => {
  return (
    <div
      className="auth-background"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="auth-content">{children}</div>
    </div>
  );
};

export default AuthBack;
