import React from "react";
import Sidebar from "../Sidebar";
import { menuItems } from "../../utils/menuItems";
import { Box, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box display="flex">
      <Sidebar items={menuItems} />
      <Box
        flex="1"
        p={4}
        bg={"brand.900"}
        overflowY={"scroll"}
        height={"100vh"}
      >
        {/* Your main content goes here */}
        {/* <Text>Welcome to the dashboard!</Text> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
