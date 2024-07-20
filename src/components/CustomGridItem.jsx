import { GridItem, Text } from "@chakra-ui/react";
import React from "react";

const CustomGridItem = ({ title, value }) => {
  return (
    <>
      <GridItem colSpan={1}>
        <Text fontWeight={"bold"}>{title}</Text>
      </GridItem>
      <GridItem colSpan={4}>
        <Text>: {value}</Text>
      </GridItem>
    </>
  );
};

export default CustomGridItem;
