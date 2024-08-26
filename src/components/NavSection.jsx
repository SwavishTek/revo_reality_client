import React from "react";
import { Box, VStack, Collapse } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const NavSection = ({
  isOpen,
  items,
  activeItem,
  handleItemClick,
  sectionLabel,
}) => {
  return (
    <MotionBox
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
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
                transition="background-color 0.3s ease"
              >
                {item.icon}
                {item.label}
              </Box>
            </Link>
            {item.children && (
              <Collapse in={activeItem === item.label} animateOpacity>
                <VStack spacing={2} align="start" pl={4}>
                  {item.children.map((child) => (
                    <Link to={child.href} key={child.label}>
                      <Box
                        p={2}
                        borderRadius="md"
                        w="full"
                        bg={
                          activeItem === child.label ? "gray.700" : "gray.800"
                        }
                        onClick={() => handleItemClick(child.label)}
                        transition="background-color 0.3s ease"
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
    </MotionBox>
  );
};

export default NavSection;
