import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const CardHeader = ({ items = [], onChange, value }) => {
  const [active, setActive] = useState(value ?? "");

  const handleClick = (value) => {
    setActive(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Box
      bg={"white"}
      py={3}
      px={5}
      borderRadius={8}
      shadow={2}
      border={1}
      borderColor={"gray.50"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {
        items.map((item) => (
          <Text
            key={item.label}
            onClick={() => handleClick(item.value)}
            textDecoration={item.value === active ? "underline" : "none"}
            color={item.value === active ? item.color : "gray"}
            cursor={"pointer"}
          >
            {item.label}
          </Text>
        ))

        // Add more items as needed
      }
      {/* <Text>New</Text>
      <Text textDecoration={"underline"} color={"yellow.600"}>
        Draft
      </Text>
      <Text color={"gray"}>Draft</Text>
      <Text>Draft</Text>
      <Text>Draft</Text>
      <Text>Draft</Text>
      <Text>Draft</Text> */}
    </Box>
  );
};

export default CardHeader;
