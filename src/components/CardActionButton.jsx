import { Button, Spinner } from "@chakra-ui/react";
import React from "react";
import LoadButton from "./LoadButton";

const CardActionButton = ({ title, onClick, icon, isLoading }) => {
  return (
    <LoadButton
      onClick={onClick}
      borderRadius={0}
      sx={{ border: "1px solid lightgray" }}
      _hover={{ bg: "inherit" }}
      bg={"brand.900"}
      px={6}
      gap={2}
      fontSize={"15px"}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </LoadButton>
  );
};

export default CardActionButton;
