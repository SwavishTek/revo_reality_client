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
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ items = [] }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(null);

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
      w="250px"
      //   bg="gray.800"
      //   color="white"
      p={4}
      borderRight="1px"
      borderColor="gray.100"
    >
      <Box mb={6}>
        {/* Replace with your logo */}
        <Text fontSize="2xl" fontWeight="bold">
          Logo
        </Text>
      </Box>

      <VStack spacing={3} align="start">
        {items.map((item) => (
          <Box key={item.label} w="full">
            <Link to={item.href}>
              <Box
                _hover={{ bg: "gray.50" }}
                color={activeItem === item.label ? "brand.500" : "black"}
                p={2}
                borderRadius="12px"
                w="full"
                bg={activeItem === item.label ? "gray.100" : "white"}
                fontWeight={"bold"}
                cursor={"pointer"}
                onClick={() => handleItemClick(item.label)}
              >
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

      <Button colorScheme="red" w="full" mt={4}>
        Logout
      </Button>
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
