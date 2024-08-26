// Sidebar.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Spacer,
  Collapse,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { svg } from "../assets/svg.js";
import { CiSettings, CiBellOn } from "react-icons/ci";
import { useProfileQuery } from "../Queries/auth/useProfileQuery";
import { PiPowerFill } from "react-icons/pi";
import { logout } from "../useFunctions/auth/auth";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { crmMenuItems } from "../utils/menuItems.js";

const Sidebar = ({ items = [] }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: auth } = useProfileQuery();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const activeParent = items.find((item) => {
      if (item.children) {
        return item.children.some((child) =>
          location.pathname.includes(child.href)
        );
      }
      return location.pathname.includes(item.href);
    });

    setActiveItem(activeParent ? activeParent.label : null);
  }, [location.pathname, items]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const handleNotificationClick = () => {
    navigate("/users/notification");
  };

  return (
    <Flex
      direction="column"
      h="100%"
      w="230px"
      //   bg="gray.800"
      //   color="white"
      p={4}
      pr={0}
      pt={8}
      borderRight="1px"
      borderColor="gray.100"
      gap={"10px"}
    >
      <Box mb={6}>
        {/* Replace with your logo */}
        <Image src={svg.logos} alt="Revo Reality" />
      </Box>

      {/* //user personal section */}
      <Box mr={4}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <div style={{ flex: 1 }}>
            <Link to={`/users/${auth?._id}`}>
              <Avatar />
            </Link>
          </div>
          <Link to={`/users/profilesettings`}>
            <CiSettings size={"1.6rem"} />
          </Link>
          <CiBellOn
            size={"1.6rem"}
            onClick={handleNotificationClick}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Text fontFamily={"Roboto"} fontWeight={"14px"} my={2}>{`${
          auth?.name || ""
        } ${auth?.lastName || ""}`}</Text>
        <Box></Box>
      </Box>

      <Button
        fontFamily={"Roboto"}
        width="180px"
        height="35px"
        px={"25px"}
        borderRadius={"90px"}
        gap="50px"
        bg={"#D0837F"}
        color={"white"}
        rightIcon={<ChevronDownIcon />}
        _hover={{ opacity: 1 }}
      >
        HRMS
      </Button>

      {/* nav links */}
      <VStack spacing={3} align="start" flex={1}>
        {items.map((item) => (
          <Box key={item.label} w="full">
            <Link to={item.href}>
              <Box
                _hover={{ bg: "gray.50" }}
                color={activeItem === item.label ? "brand.500" : "black"}
                p={2}
                borderRadius="12px"
                borderTopEndRadius={0}
                borderBottomEndRadius={0}
                w="full"
                bg={activeItem === item.label ? "brand.900" : "white"}
                fontWeight={"medium"}
                cursor={"pointer"}
                onClick={() => handleItemClick(item.label)}
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                {item.icon}

                {item.label}
              </Box>
            </Link>
            {item.children && (
              <Collapse in={activeItem === item.label} animateOpacity>
                <VStack spacing={2} align="start" pl={4}>
                  {item.children.map((child) => (
                    <Link to={child.href}>
                      <Box
                        key={child.label}
                        // _hover={{ textDecoration: "none", bg: "gray.700" }}
                        p={2}
                        borderRadius="md"
                        w="full"
                        bg={
                          activeItem === child.label ? "gray.700" : "gray.800"
                        }
                        onClick={() => handleItemClick(child.label)}
                      >
                        {child.label}
                      </Box>
                    </Link>
                  ))}
                </VStack>
              </Collapse>
            )}
          </Box>
        ))}
      </VStack>

      <Spacer />

      <Button
        fontFamily={"Roboto"}
        width="180px"
        height="35px"
        px={"25px"}
        borderRadius={"90px"}
        gap="50px"
        bg={"#D0837F"}
        color={"white"}
        rightIcon={<ChevronDownIcon />}
        _hover={{ opacity: 1 }}
      >
        CRMS
      </Button>

      <VStack spacing={3} align="start" flex={1}>
        {crmMenuItems.map((item) => (
          <Box key={item.label} w="full">
            <Link to={item.href}>
              <Box
                _hover={{ bg: "gray.50" }}
                color={activeItem === item.label ? "brand.500" : "black"}
                p={2}
                borderRadius="12px"
                borderTopEndRadius={0}
                borderBottomEndRadius={0}
                w="full"
                bg={activeItem === item.label ? "brand.900" : "white"}
                fontWeight={"medium"}
                cursor={"pointer"}
                onClick={() => handleItemClick(item.label)}
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                {item.icon}

                {item.label}
              </Box>
            </Link>
            {item.children && (
              <Collapse in={activeItem === item.label} animateOpacity>
                <VStack spacing={2} align="start" pl={4}>
                  {item.children.map((child) => (
                    <Link to={child.href}>
                      <Box
                        key={child.label}
                        // _hover={{ textDecoration: "none", bg: "gray.700" }}
                        p={2}
                        borderRadius="md"
                        w="full"
                        bg={
                          activeItem === child.label ? "gray.700" : "gray.800"
                        }
                        onClick={() => handleItemClick(child.label)}
                      >
                        {child.label}
                      </Box>
                    </Link>
                  ))}
                </VStack>
              </Collapse>
            )}
          </Box>
        ))}
      </VStack>

      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        _hover={{ bg: "brand.900" }}
        borderRadius={2}
        cursor={"pointer"}
        mr={4}
        mt={4}
        p={2}
        onClick={() => {
          logout();
          queryClient.clear();
          navigate("/auth/login");
        }}
      >
        <PiPowerFill size={"1.4rem"} />
        <Text fontWeight={"medium"}>Logout</Text>
      </Box>
      {/* <Button mr={4} mt={4}></Button> */}
    </Flex>
  );
};

export default Sidebar;
