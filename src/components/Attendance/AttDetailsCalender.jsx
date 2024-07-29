import { Card, GridItem, Stack, Input, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calender from "./Calender";
// import ConfirmationDialog from "../ConfirmationDialog";
// import CustomGridItem from "../CustomGridItem";
// import { useNavigate } from "react-router-dom";

const AttDetailsCalender = () => {
  // const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  // const [selectedDetails, setSelectedDetails] = useState({});
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const colors = ["#FF0000", "#4ABC04", "#FF8A00"];

  useEffect(() => {
    if (startDate) {
      setSelectedMonth(startDate.getMonth());
      setSelectedYear(startDate.getFullYear());
    } else if (endDate) {
      setSelectedMonth(endDate.getMonth());
      setSelectedYear(endDate.getFullYear());
    } else {
      setSelectedMonth(currentMonth);
      setSelectedYear(currentYear);
    }
  }, [startDate, endDate, currentMonth, currentYear]);

  const generateCalendarData = (month, year) => {
    const calendarData = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
      calendarData.push({
        _id: i,
        date: i,
        day: dayOfWeek,
        color: colors[(i - 1) % colors.length],
      });
    }
    return calendarData;
  };

  const calendarData = generateCalendarData(selectedMonth, selectedYear);
  const filteredCalendarData = calendarData.map((item) => {
    const itemDate = new Date(2024, selectedMonth, item.date);
    if (startDate && endDate && itemDate >= startDate && itemDate <= endDate) {
      return item;
    } else if (!startDate && !endDate) {
      return item;
    }
    return { ...item, color: null };
  });

  // const handleOpen = (details) => {
  //   setSelectedDetails(details);
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleUpdate = () => {
  //   navigate("/attendace/AttUpdate");
  //   handleClose();
  // };

  // console.log("open", open);

  return (
    <>
      <Card
        p={"2rem"}
        mt={6}
        overflowY={"auto"}
        height={"100%"}
        borderRadius={"10px"}
        border={"1px solid #BBBBBB"}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <GridItem>
            <Text color={"#000000"} fontSize={"19px"} fontWeight={"600"}>
              {new Date(2024, selectedMonth).toLocaleString("default", {
                month: "long",
              })}
            </Text>
          </GridItem>
          <Stack direction={"row"} spacing={"2"}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              customInput={<Input borderRadius={8} background={"#FFFFFF"} />}
              maxDate={today}
              showMonthDropdown
              dropdownMode="select"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              customInput={<Input borderRadius={8} background={"#FFFFFF"} />}
              maxDate={today}
              showMonthDropdown
              dropdownMode="select"
            />
          </Stack>
        </Stack>
        <Card
          p={"rem"}
          border={"1px solid #B0B0B0"}
          mt={8}
          overflowY={"auto"}
          height={"100%"}
          background={"#F9F9F9"}
        >
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(7, 1fr)",
            }}
          >
            {filteredCalendarData.map((item, index) => {
              const isFirst = index % 7 === 0;
              const isLast = (index + 1) % 7 === 0;
              const isTop = index < 7;
              const isBottom = index >= 21;
              return (
                <Calender
                  date={item.date}
                  key={item._id}
                  day={item?.day}
                  color={item.color}
                  isFirst={isFirst}
                  isLast={isLast}
                  isTop={isTop}
                  isBottom={isBottom}
                  // handleOpen={() => handleOpen(item)}
                />
              );
            })}
          </Grid>
        </Card>
      </Card>
      {/* <ConfirmationDialog
        title="INFORMATION"
        isOpen={open}
        onClose={handleClose}
        handleUpdate={handleUpdate}
      >
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
          <CustomGridItem title={"Day"} value={selectedDetails?.day} />
          <CustomGridItem title={"Date"} value={selectedDetails?.date} />
        </Grid>
      </ConfirmationDialog> */}
    </>
  );
};

export default AttDetailsCalender;
