import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ title = "Back", children }) => {
  const navigate = useNavigate();

  return (
    <Box display={"flex"} alignItems={"center"} my={2}>
      <Text
        flex={1}
        fontWeight={"semibold"}
        fontSize={"1.8rem"}
        display={"flex"}
        alignItems={"center"}
        gap={2}
      >
        <ArrowBackIcon onClick={() => navigate(-1)} cursor={"pointer"} />
        {title}
      </Text>
      {children}
    </Box>
  );
};

export default BackButton;
