import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Header = ({ title = "title", children }) => {
  return (
    <Box display={"flex"} alignItems={"center"} my={2}>
      <Text flex={1} fontWeight={"semibold"} fontSize={"30px"}>
        {title}
      </Text>
      {children}
    </Box>
  );
};

export default Header;
