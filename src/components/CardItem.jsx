import { Box, Text } from "@chakra-ui/react";
import React from "react";

const CardItem = ({ title = "", value = "", component = null }) => {
  return (
    <Box maxWidth="200px">
      <Text fontWeight={600}>{title}</Text>
      {component ? (
        component
      ) : (
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {value}
        </Text>
      )}
    </Box>
  );
};

export default CardItem;
