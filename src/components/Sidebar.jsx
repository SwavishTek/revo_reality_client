// Sidebar.js
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  //   Link,
  Button,
  VStack,
  Spacer,
  Collapse,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { CiSettings, CiBellOn } from "react-icons/ci";
import { useProfileQuery } from "../Queries/auth/useProfileQuery";
import { TbTargetArrow } from "react-icons/tb";
import { PiPowerFill } from "react-icons/pi";
import { logout } from "../useFunctions/auth/auth";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = ({ items = [] }) => {
  const queryClient = useQueryClient();

  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(null);
  const { data: auth } = useProfileQuery();

  React.useEffect(() => {
    const activeParent = items.find((item) => {
      if (item.children) {
        return item.children.some((child) => child.href === location.pathname);
      }
      return item.href === location.pathname;
    });

    setActiveItem(activeParent ? activeParent.label : null);
  }, [location.pathname, items]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    // setActiveItem(activeItem === item ? null : item);
  };

  return (
    <Flex
      direction="column"
      h="100vh"
      w="230px"
      //   bg="gray.800"
      //   color="white"
      p={4}
      pr={0}
      pt={8}
      borderRight="1px"
      borderColor="gray.100"
    >
      <Box mb={6}>
        {/* Replace with your logo */}
        <Image src={logo} alt="Revo Reality" />
      </Box>

      {/* //user personal section */}
      <Box mr={4}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <div style={{ flex: 1 }}>
            <Avatar />
          </div>
          <CiSettings size={"1.6rem"} />
          <CiBellOn size={"1.6rem"} />
        </Box>
        <Text my={2}>{`${auth?.name || ""} ${auth?.lastName || ""}`}</Text>
        <Box></Box>
      </Box>

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

// SidebarDrawer.js
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   Flex,
//   Link,
//   VStack,
//   useDisclosure,
//   IconButton,
// } from "@chakra-ui/react";
// import { HamburgerIcon } from "@chakra-ui/icons";

// const SidebarDrawer = ({ items = [] }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [activeItem, setActiveItem] = useState(null);

//   const handleItemClick = (item) => {
//     setActiveItem(activeItem === item ? null : item);
//   };

//   return (
//     <>
//       <IconButton
//         icon={<HamburgerIcon />}
//         onClick={onOpen}
//         position="fixed"
//         top="1rem"
//         left="1rem"
//         zIndex="overlay"
//       />

//       <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
//         <DrawerOverlay />
//         <DrawerContent>
//           <DrawerCloseButton />
//           <DrawerHeader>Logo</DrawerHeader>

//           <DrawerBody>
//             <VStack spacing={4} align="start">
//               {items.map((item) => (
//                 <Box key={item.label} w="full">
//                   <Link
//                     href={item.href}
//                     _hover={{ textDecoration: "none", bg: "gray.700" }}
//                     p={2}
//                     borderRadius="md"
//                     w="full"
//                     bg={activeItem === item.label ? "gray.700" : "gray.800"}
//                     onClick={() => handleItemClick(item.label)}
//                   >
//                     {item.label}
//                   </Link>
//                   {item.children && (
//                     <VStack spacing={2} align="start" pl={4}>
//                       {item.children.map((child) => (
//                         <Link
//                           key={child.label}
//                           href={child.href}
//                           _hover={{ textDecoration: "none", bg: "gray.700" }}
//                           p={2}
//                           borderRadius="md"
//                           w="full"
//                           bg={
//                             activeItem === child.label ? "gray.700" : "gray.800"
//                           }
//                           onClick={() => handleItemClick(child.label)}
//                         >
//                           {child.label}
//                         </Link>
//                       ))}
//                     </VStack>
//                   )}
//                 </Box>
//               ))}
//             </VStack>
//           </DrawerBody>

//           <DrawerFooter>
//             <Button colorScheme="red" w="full" onClick={onClose}>
//               Logout
//             </Button>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// };

// export default SidebarDrawer;
