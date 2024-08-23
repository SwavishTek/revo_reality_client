import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { adminArr, menuItems, menuItemsAgent } from "../../utils/menuItems";
import { Box, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";

const MainLayout = () => {
  const navigate = useNavigate();
  const { data: auth } = useProfileQuery();
  const isSupSubAdmin = adminArr.includes(auth?.role);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <Box display="flex">
      <Sidebar items={isSupSubAdmin ? menuItems : menuItemsAgent} />
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
