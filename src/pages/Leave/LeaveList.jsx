import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLeaveQuery } from "../../Queries/leave/useLeaveQuery";
import LeaveCard from "../../components/Leave/LeaveCard";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { MyContainer } from "../../myComponent/MyContainer";
import { BoarderBox } from "../../myComponent/BoarderBox";
import { CustomText } from "../../myComponent/CustomText";
// import { FixedSizeList as List } from "react-window";

const LeaveList = () => {
  const [leaveStatus, setLeaveStatus] = useState("new");
  const [search, setSearch] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useLeaveQuery({ status: leaveStatus, search });
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

  const allLeaves = data?.pages?.flatMap((page) => page?.data || []) || [];
  return (

    <MyContainer
      header={'All Leaves'}
      btnComponent={<>
        <CustomBtn
          title={'My Leaves'}
        />
      </>}
    >

      <Box paddingBottom={10}>
        {allLeaves.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {allLeaves.map((item) => (
              <LeaveCard item={item} key={item._id} refetch={refetch} />
            ))}
          </VStack>
        ) : status === "pending" ? (
          <Text>Loading...</Text>
        ) : (
          <Text>No Leaves found</Text>
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

    </MyContainer>
  );
};

export default LeaveList;
