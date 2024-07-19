import { Button } from "@chakra-ui/react";
import React from "react";

const CardActionButton = ({ title, onClick }) => {
  return (
    <Button
      onClick={onClick}
      borderRadius={0}
      sx={{ border: "1px solid lightgray" }}
      bg={"brand.900"}
      px={8}
    >
      {title}
    </Button>
  );
};

export default CardActionButton;
