import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { menuItems } from "../../utils/menuItems";
import { Box, Text } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    } else {
      if (pathname === "/") {
        navigate("/dashboard");
      }
    }
  }, [navigate, pathname]);

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
