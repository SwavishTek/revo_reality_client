import { Box, Card, Center, Grid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Confirmation from "../../components/Confirmation";
import CustomGridItem from "../CustomGridItem";
import ConfirmationDialog from "../ConfirmationDialog";

const Calender = ({ date, color, isTop, isBottom, isFirst, isLast, day }) => {
  const [open, setOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const borderRadius = {
    topLeft: isTop && isFirst ? "8px 0 0 0" : "0",
    topRight: isTop && isLast ? "0 8px 0 0" : "0",
    bottomLeft: isBottom && isFirst ? "0 0 0 8px" : "0",
    bottomRight: isBottom && isLast ? "0 0 8px 0" : "0",
  };

  const handleOpen = () => {
    if (color && day !== "Sunday") {
      setSelectedDetails({
        day: day,
        date: date,
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        height={"6rem"}
        onClick={handleOpen}
        cursor={color && day !== "Sunday" ? "pointer" : ""}
        background={"#F9F9F9"}
        border={"1px solid #B0B0B0"}
        padding={"10px 10px 10px 0px"}
        borderRadius={`${borderRadius.topLeft} ${borderRadius.topRight} ${borderRadius.bottomRight} ${borderRadius.bottomLeft}`}
      >
        <Text
          color={day === "Sunday" ? "#BC1C1C" : "#000000"}
          marginLeft={3}
          fontSize={"12px"}
          fontWeight={"400"}
        >
          {day}
        </Text>
        {day !== "Sunday" && (
          <Text
            height={"1rem"}
            width={"60%"}
            background={color}
            marginTop={3}
            display={"flex"}
            alignItems="center"
            justifyContent="flex-start"
            borderRadius="0px 10px 10px 0px"
          ></Text>
        )}
        <Text justifyContent={"right"} display={"flex"}>
          {date}
        </Text>
      </Card>

      <ConfirmationDialog
        title="INFORMATION"
        isOpen={open}
        onClose={handleClose}
      >
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
          <CustomGridItem title={"Day"} value={selectedDetails?.day} />
          <CustomGridItem title={"Date"} value={selectedDetails?.date} />
        </Grid>
      </ConfirmationDialog>
    </>
  );
};

export default Calender;
