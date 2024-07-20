import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Title = ({ title = "Title" }) => {
  return (
    <Box>
      <Text fontSize={"1.4rem"} fontWeight={600}>
        {title}
      </Text>
      <hr />
    </Box>
  );
};

export default Title;
