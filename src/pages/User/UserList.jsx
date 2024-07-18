import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import CardHeader from "../../components/CardHeader";
import { userHeaderItems } from "../../utils/menuItems";
import UserCard from "../../components/User/UserCard";
import { useUserQuery } from "../../Queries/user/userUserQuery";
import { useInView } from "react-intersection-observer";
// import { FixedSizeList as List } from "react-window";

const UserList = () => {
  const [userStatus, setUserStatus] = useState("new");
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useUserQuery({ status: userStatus, search });
  const { ref, inView } = useInView();
  console.log(data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "error") {
    return <Text>Error fetching data</Text>;
  }

  const allUsers = data?.pages?.flatMap((page) => page.data) || [];
  console.log(allUsers);
  return (
    <VStack spacing={4} align="stretch" height="100vh" p={4}>
      <Box>
        <Header title="All Employees">
          <Button colorScheme="brand">Add Employee</Button>
          {/* Add more buttons here */}
        </Header>
        <Filters onSearchChange={setSearch} />
        <CardHeader
          value={userStatus}
          items={userHeaderItems}
          onChange={setUserStatus}
        />
        <Box maxHeight={"400px"} my={4} overflowY="auto">
          {allUsers.length > 0 ? (
            <VStack spacing={4} align="stretch">
              {allUsers.map((item) => (
                <UserCard item={item} key={item._id} />
              ))}
            </VStack>
          ) : status === "pending" ? (
            <Text>Loading...</Text>
          ) : (
            <Text>No users found</Text>
          )}
          <Box ref={ref}>
            {isFetchingNextPage ? (
              <Text>Loading more...</Text>
            ) : (
              hasNextPage && (
                <Button onClick={() => fetchNextPage()}>Load More</Button>
              )
            )}
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default UserList;
