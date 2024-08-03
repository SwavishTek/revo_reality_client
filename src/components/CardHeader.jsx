import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomText } from "../myComponent/CustomText";

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
          <CustomText
            key={item.label}
            onClick={() => handleClick(item.value)}
            textDecoration={item.value === active ? "underline" : "none"}
            color={item.value === active ? item.color : "gray"}
            cursor={"pointer"}
            fontSize="16px"
            fontWeight="400"
          >
            {item.label}
          </CustomText>
        ))

        // Add more items as needed
      }
    </Box>
  );
};

export default CardHeader;
