import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomText } from "../myComponent/CustomText";

const BackButton = ({ title = "Back", children }) => {
  const navigate = useNavigate();

  return (
    <Box display={"flex"} alignItems={"center"} my={2}>
      <CustomText
        flex={1}
        fontWeight={"semibold"}
        fontSize={"1.8rem"}
        display={"flex"}
        alignItems={"center"}
        color={"#000000"}
        gap={2}
      >
        <ArrowBackIcon onClick={() => navigate(-1)} cursor={"pointer"} />
        {title}
      </CustomText>
      {children}
    </Box>
  );
};

export default BackButton;
