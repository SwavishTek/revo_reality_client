import { Box, Button } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import CardHeader from "../../components/CardHeader";
import { userHeaderItems } from "../../utils/menuItems";

const UserList = () => {
  return (
    <Box>
      <Header title="All Employees">
        <Button colorScheme="brand">Add Employee</Button>
        {/* Add more buttons here */}
      </Header>
      <Filters />
      <CardHeader
        value={"new"}
        items={userHeaderItems}
        onChange={(v) => console.log(v)}
      />
    </Box>
  );
};

export default UserList;
