import { Box, Img } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../myComponent/CustomText";
import { svg } from "../assets/svg.js"

const BackButton = ({ title = "Back", children }) => {
  const navigate = useNavigate();

  return (
    <Box display={"flex"} alignItems={"center"} my={2} mx={2}>
      <CustomText
        flex={1}
        fontWeight={"semibold"}
        fontSize={"30px"}
        display={"flex"}
        alignItems={"center"}
        color={"#000000"}
        gap={3}
      >
        <Img src={svg.backIcon} onClick={() => navigate(-1)} cursor={"pointer"} />
        {title}
      </CustomText>
      {children}
    </Box>
  );
};

export default BackButton;
