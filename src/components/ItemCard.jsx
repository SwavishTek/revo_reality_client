import { Card, Text } from "@chakra-ui/react";
import React from "react";

const ItemCard = ({ title, value }) => {
  return (
    <Card p={2}>
      <Text
        textAlign={"center"}
        fontSize={"2rem"}
        fontWeight={"bold"}
        fontStyle={"italic"}
      >
        {value}
      </Text>
      <Text textAlign={"center"} fontSize={"14px"}>
        {title}
      </Text>
    </Card>
  );
};

export default ItemCard;
