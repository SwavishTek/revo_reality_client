import { Text } from "@chakra-ui/react";
import React from "react";

const CardItem = ({ title = "", value = "" }) => {
  return (
    <div>
      <Text fontWeight={600}>{title}</Text>
      <Text>{value}</Text>
    </div>
  );
};

export default CardItem;
