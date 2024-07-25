import { Text } from "@chakra-ui/react";
import React from "react";

const CardItem = ({ title = "", value = "" }) => {
  return (
    <div>
      <Text fontWeight={600} color={"#000000"} fontSize={"15px"} >{title}</Text>
      <Text color={"#000000"} fontWeight={"300"} >{value}</Text>
    </div>
  );
};

export default CardItem;
