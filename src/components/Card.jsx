import { Avatar, background, Box, Button, Checkbox } from "@chakra-ui/react";
import React from "react";
import CardActionButton from "./CardActionButton";

const Card = ({
  children,
  actionSection,
  avatarName,
  avatarSrc,
  backgroundColor,
  color,
}) => {
  return (
    <Box bg={"white"} borderRadius={6} overflow={"hidden"} minWidth={1000}>
      <Box p={3} display={"flex"} gap={4} alignItems={"flex-start"} mb={4}>
        <Checkbox />
        <Avatar
          name={avatarName ?? ""}
          src={avatarSrc ?? ""}
          background={backgroundColor}
          color={color}
        />
        {children}
      </Box>
      <Box>
        {actionSection}
        {/* <CardActionButton title={"hii"} />
        <Button borderRadius={0} sx={{ border: "1px solid lightgray" }} px={8}>
          Hii
        </Button>
        <Button borderRadius={0} sx={{ border: "1px solid lightgray" }} px={8}>
          Hii
        </Button> */}
      </Box>
    </Box>
  );
};

export default Card;
