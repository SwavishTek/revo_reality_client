import { Box, GridItem, Text } from "@chakra-ui/react";
import React from "react";

const CustomGridItem = ({ title, value }) => {
  return (
    <>
      <GridItem colSpan={1} alignSelf={"center"}>
        <Text fontWeight={"bold"}>{title}</Text>
      </GridItem>
      <GridItem colSpan={4}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          : {value}
        </Box>
      </GridItem>
    </>
  );
};

export default CustomGridItem;
