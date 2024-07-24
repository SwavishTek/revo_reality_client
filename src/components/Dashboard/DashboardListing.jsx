import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import DashListingCard from "./DashListingCard";

const DashboardListing = ({ color = "black", title, count }) => {
  return (
    <Card p={4}>
      <Box
        color={color}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        fontSize={"1.2rem"}
        borderBottom={`1px solid`}
        borderColor={color}
      >
        <Text>{title}</Text>
        <Text>{count}</Text>
      </Box>

      <Box py={4} display={"flex"} flexDirection={"column"} gap={4}>
        <DashListingCard avatarColor={color} />
        <DashListingCard avatarColor={color} />
        <DashListingCard avatarColor={color} />
        <DashListingCard avatarColor={color} />
      </Box>
    </Card>
  );
};

export default DashboardListing;
