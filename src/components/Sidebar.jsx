import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Spacer,
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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { crmMenuItems } from "../utils/menuItems.js";
import NavSection from "./NavSection"; // Import the NavSection component

const Sidebar = ({ items = [] }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: auth } = useProfileQuery();
  const [activeItem, setActiveItem] = useState(null);
  const [isHrmsOpen, setHrmsOpen] = useState(true);
  const [isCrmsOpen, setCrmsOpen] = useState(true);

  useEffect(() => {
    const activeParent = [...items, ...crmMenuItems].find((item) => {
      if (item.children) {
        return item.children.some((child) =>
          location.pathname.includes(child.href)
        );
      }
      return location.pathname.includes(item.href);
    });
    setActiveItem(activeParent ? activeParent.label : null);
  }, [location.pathname, items]);

  const handleItemClick = (item) => setActiveItem(item);
  const handleNotificationClick = () => navigate("/users/notification");

  const toggleHrms = () => setHrmsOpen(!isHrmsOpen);
  const toggleCrms = () => setCrmsOpen(!isCrmsOpen);

  return (
    <Flex
      direction="column"
      h="100%"
      w="230px"
      p={4}
      pr={0}
      pt={8}
      borderRight="1px"
      borderColor="gray.100"
      gap={"10px"}
    >
      <Box mb={6}>
        <Image src={svg.logos} alt="Revo Reality" />
      </Box>

      {/* User personal section */}
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
        rightIcon={isHrmsOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        _hover={{ opacity: 1 }}
        onClick={toggleHrms}
      >
        HRMS
      </Button>

      {/* HRMS nav links */}
      <NavSection
        isOpen={isHrmsOpen}
        items={items}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        sectionLabel="HRMS"
      />

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
        rightIcon={isCrmsOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        _hover={{ opacity: 1 }}
        onClick={toggleCrms}
      >
        CRMS
      </Button>

      {/* CRMS nav links */}
      <NavSection
        isOpen={isCrmsOpen}
        items={crmMenuItems}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        sectionLabel="CRMS"
      />

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
    </Flex>
  );
};

export default Sidebar;
