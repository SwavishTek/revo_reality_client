import { Box, Button } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import Filters from "../../components/Filters";

const UserList = () => {
  return (
    <Box>
      <Header title="All Employees">
        <Button colorScheme="brand">Add Employee</Button>
        {/* Add more buttons here */}
      </Header>
      <Filters />
    </Box>
  );
};

export default UserList;
