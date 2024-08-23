import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadButton = ({
  isLoading = false,
  onClick,
  variant = "primary",
  size = "md",
  color,
  icon,
  iconPosition = "left",
  children,
  colorScheme,
  fontSize,
  ...props
}) => {
  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      onClick={onClick}
      fontSize={fontSize}
      boxShadow="2.63px 3.5px 9.38px 0px #00000029"
      color={color}
      {...props}
      _hover={{ bg: "brand" }}
           _active={{ bg: "brand" }}
           _focus={{ bg: "brand"}}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  );
};

export default LoadButton;
