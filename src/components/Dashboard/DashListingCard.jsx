import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const DashListingCard = ({ avatarColor, name }) => {
  return (
    <Box
      bg={"brand.gray"}
      p={2}
      borderRadius={2}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box>
        <Box>
          <Text fontWeight={"bold"} fontSize={"12px"}>
            Employee Name:{" "}
          </Text>
          <Text fontSize={"12px"}>Employee 1</Text>
        </Box>
        <Box mt={2}>
          <Text fontWeight={"bold"} fontSize={"12px"}>
            Employee Role:{" "}
          </Text>
          <Text fontSize={"12px"}>Agent</Text>
        </Box>
      </Box>
      <Box>
        <Box>
          <Text fontWeight={"bold"} fontSize={"12px"}>
            Mobile Number:{" "}
          </Text>
          <Text fontSize={"12px"}>916397506060</Text>
        </Box>
      </Box>

      <Avatar bg={avatarColor} name={name} size={"sm"} />
    </Box>
  );
};

export default DashListingCard;
