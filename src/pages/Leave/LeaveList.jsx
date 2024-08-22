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
import NoDataFound from "../User/components/NoDataFound";
import Filters from "../../components/Filters";
import CardHeader from "../../components/CardHeader";
import { leaveHeaderItems } from "../../utils/menuItems";
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
          title={'Apply For Leave'}
          onClick={() => navigate('/leaves/apply_leave')}
        />
      </>}
    >
      <Filters onSearchChange={setSearch} />
      <CardHeader
        value={leaveStatus}
        items={leaveHeaderItems}
        onChange={setLeaveStatus}
      />
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
        loadingMessage="Loading Leave List..."
        errorMessage="Error fetching teams"
        noDataMessage={
          <>
            <NoDataFound message={'No Data Found'} name="NoLeave" />
          </>
        }
        gap={2}
        containerStyle={{
          marginTop: '1rem'
        }}
      />
      {/* {[...new Array(20)].map((el) => {
        return <LeaveListItem />
      })} */}


    </MyContainer>
  );
};

export default LeaveList;
