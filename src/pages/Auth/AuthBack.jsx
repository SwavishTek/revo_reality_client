import React from "react";
import "../../style/AuthBackground.css"; // Import the CSS file
import imageUrl from "../../assets/AuthBack.png";
import logo from '../../assets/logowhite.svg';

const AuthBack = ({ children }) => {
  return (
    <div
      className="auth-background"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
    <div className="auth-image">
        <img src={logo} alt="Logo" />
      </div>
      <div className="auth-content">{children}</div>
    </div>
  );
};

export default AuthBack;
