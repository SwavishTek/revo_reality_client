import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import CardHeader from "../../components/CardHeader";
import { leaveHeaderItems } from "../../utils/menuItems";
import { useUserQuery } from "../../Queries/user/userUserQuery";
import { useInView } from "react-intersection-observer";
import { queryClient } from "../..";
import LeaveCard from "../../components/Leave/LeaveCard";
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";
// import { FixedSizeList as List } from "react-window";

const LeaveList = () => {
  const [userStatus, setUserStatus] = useState("new");
  const [search, setSearch] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useUserQuery({ status: userStatus, search });
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

  const allUsers = data?.pages?.flatMap((page) => page?.data || []) || [];
  console.log(allUsers);
  return (
    <VStack spacing={4} align="stretch" height="100vh" p={4}>
      <Box>
        <BackButton title={"My Leave List"}>
          <Link to={"/leaves/apply_leave"}>
            <Button colorScheme="brand">Apply For Leave</Button>
          </Link>
        </BackButton>

        <Filters onSearchChange={setSearch} showDates />
        <CardHeader
          value={userStatus}
          items={leaveHeaderItems}
          onChange={setUserStatus}
        />
        <LeaveCard refetch={refetch} />
        <Box maxHeight={"400px"} my={4} overflowY="auto">
          {allUsers.length > 0 ? (
            <VStack spacing={4} align="stretch">
              {allUsers.map((item) => (
                <LeaveCard item={item} key={item._id} refetch={refetch} />
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

export default LeaveList;
