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
      color={color}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  );
};

export default LoadButton;
