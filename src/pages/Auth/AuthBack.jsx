import React from "react";
import "../../style/AuthBackground.css"; // Import the CSS file
import imageUrl from "../../assets/AuthBack.png";
import { svg } from "../../assets/svg.js";
import { Box } from "@chakra-ui/react";

const AuthBack = ({ children }) => {
  return (
    <div
      className="auth-background"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* <div className="auth-image">
      </div> */}
      <Box display={"flex"} flexDirection={"column"} gap={6}>
        <Box width={"220px"} alignSelf={"center"}>
          <img src={svg.logo} alt="Logo" />
        </Box>
        <div className="auth-content">{children}</div>
      </Box>
    </div>
  );
};

export default AuthBack;
