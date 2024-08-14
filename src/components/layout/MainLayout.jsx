import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { menuItems } from "../../utils/menuItems";
import { Box, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <Box display="flex">
      <Sidebar items={menuItems} />
      <Box
        flex="1"
        // p={4}
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
