import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#a0aec0"
        size="xl"
      />
    </Box>
  );
};

export default Loader;
