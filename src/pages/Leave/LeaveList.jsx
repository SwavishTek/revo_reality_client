import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Filters from "../../components/Filters";
import CardHeader from "../../components/CardHeader";
import { leaveHeaderItems } from "../../utils/menuItems";
import { useUserQuery } from "../../Queries/user/userUserQuery";
import { useInView } from "react-intersection-observer";
import LeaveCard from "../../components/Leave/LeaveCard";
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";
import { useLeaveQuery } from "../../Queries/leave/useLeaveQuery";
import { CardBorder } from "../../myComponent/CardBorder";
import { MyContainer } from "../../myComponent/MyContainer";
import { CustomText } from "../../myComponent/CustomText";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";
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
        <CustomBtn
          title={'My Employee'}
          bgColor={color.danger}
        />
        <CustomBtn
          title={'On Hold'}
          bgColor={color.success}
          isDisabled={true}
        />
        <CustomBtn
          title={'My Employee'}
          bgColor={color.info}
        />
      </>}
    >
      {/* <Box >
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
      </Box> */}
    </MyContainer>
  );
};

export default LeaveList;
