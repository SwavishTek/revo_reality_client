import React, { useState } from "react";
import Filters from "../../components/Filters";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Box, VStack, Button, Stack } from "@chakra-ui/react";
import CardHeader from "../../components/CardHeader";
import { attendanceHeaderItems } from "../../utils/menuItems";
import AttendanceCard from "../../components/Attendance/AttendanceCard";
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";
import AttListItem from "./AttListItem";

const AttList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [attStatus, setAttStatus] = useState("issuesRaised");

  const allAttendance = [
    {
      _id: 1,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },

    {
      _id: 2,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 3,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 4,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 5,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },

    {
      _id: 6,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    }, {
      _id: 7,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 8,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 9,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 11,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
    {
      _id: 12,
      employeeName: "Lead_01",
      email: "lead@gamil.com",
      mobileNumber: "7084930106",
      role: "Manager",
      joiningDate: "10/06/2024",
    },
  ];

  const activeItem = attendanceHeaderItems.find(
    (item) => item.value === attStatus
  );

  return (
    <MyContainer
      header={'Attendance'}
      btnComponent={
        <>
          <CustomBtn
            title={'Remote Punch-In'}
          />
          <CustomBtn
            title={'Remote Punch-Out'}
            bgColor={color.secondaryBtn}
          />
        </>
      }
    >
      <Stack
        direction={["column", "row"]}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Filters onSearchChange={setSearch} showDates={true} />
        <CustomBtn
          title={'My Attendance'}
        />
      </Stack>
      <InfiniteScrollList
        data={allAttendance}
        renderItem={({ item }) => {
          return <AttListItem
            item={item}
            onClickBox={() => navigate(`/attendance/${item?._id}  `)}
            onClickCheckbox={() => console.log('first')}
          />
        }}
        fetchNextPage={false}
        hasNextPage={false}
        isFetchingNextPage={false}
        isLoading={false}
        isFetching={false}
        gap={2}
      />

    </MyContainer>


    // <VStack spacing={4} align="stretch" height="100%" width={"100%"} p={4}>
    //   <Box>
    //     <Header title="Attendance">
    //       <Stack direction="row" spacing={2}>
    //         <Link to={""}>
    //           <Button
    //             colorScheme=""
    //             background={"#9A4D49"}
    //             boxShadow="2.63px 3.5px 9.38px 0px #00000029"
    //           >
    //             Remote Punch-In
    //           </Button>
    //         </Link>
    //         <Link to={""}>
    //           <Button
    //             colorScheme=""
    //             background={"#D0837F"}
    //             boxShadow="2.63px 3.5px 9.38px 0px #00000029"
    //           >
    //             Remote Punch-Out
    //           </Button>
    //         </Link>
    //       </Stack>
    //     </Header>
    //     <Stack
    //       direction={["column", "row"]}
    //       justifyContent={"space-between"}
    //       alignItems={"center"}
    //     >
    //       <Filters onSearchChange={setSearch} showDates={true} />
    //       <Link to="">
    //         <Button
    //           colorScheme=""
    //           background="#D0837F"
    //           boxShadow="2.63px 3.5px 9.38px 0px #00000029"
    //         >
    //           My Attendance
    //         </Button>
    //       </Link>
    //     </Stack>
    //   </Box>
    //   <CardHeader
    //     value={attStatus}
    //     items={attendanceHeaderItems}
    //     onChange={setAttStatus}
    //   />
    //   <Box maxHeight={"400px"} my={4} overflowY="auto" maxWidth={"100%"}>
    //     {allAttendance.length > 0 && (
    //       <VStack spacing={{ base: 2, md: 4 }} align="stretch">
    //         {allAttendance.map((item) => (
    //           <AttendanceCard
    //             item={item}
    //             key={item._id}
    //             color={activeItem ? activeItem.color : ""}
    //           />
    //         ))}
    //       </VStack>
    //     )}
    //   </Box>
    // </VStack>
  );
};

export default AttList;
