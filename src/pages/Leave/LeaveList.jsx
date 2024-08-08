import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLeaveQuery } from "../../Queries/leave/useLeaveQuery";
import LeaveCard from "../../components/Leave/LeaveCard";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { BoarderBox } from "../../myComponent/BoarderBox";
import { CustomText } from "../../myComponent/CustomText";
import MyContainer from "../../myComponent/MyContainer";
import LeaveListItem from "./component/LeaveListItem";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";
import { useNavigate } from "react-router-dom";
// import { FixedSizeList as List } from "react-window";

const LeaveList = () => {
  const navigate = useNavigate();
  const [leaveStatus, setLeaveStatus] = useState("new");
  const [search, setSearch] = useState("");
  const {
    data: allLeaves,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useLeaveQuery({ status: leaveStatus, search });

  return (

    <MyContainer
      header={'All Leaves'}
      btnComponent={<>
        <CustomBtn
          title={'My Leaves'}
        />
      </>}
    >
      <InfiniteScrollList
        data={allLeaves || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isFetching={isFetching}
        renderItem={(item) => (
          <LeaveListItem
            item={item}
            onClickBox={() => navigate(`/leaves/${item?._id}`, { state: item })}
            onClickCheckbox={(v) => console.log('firscheckBox', v)}
          />
        )}
        loadingMessage="Loading teams..."
        errorMessage="Error fetching teams"
        noDataMessage="No Teams In The System"
      />
      {/* {[...new Array(20)].map((el) => {
        return <LeaveListItem />
      })} */}


    </MyContainer>
  );
};

export default LeaveList;
