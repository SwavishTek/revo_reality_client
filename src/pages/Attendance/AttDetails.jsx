import React from "react";
import BackButton from "../../components/BackButton";
import { Box, Grid, GridItem, Card } from "@chakra-ui/react";
import CustomGridItem from "../../components/CustomGridItem";
import Title from "../../components/Title";
import AttDetailsCalender from "../../components/Attendance/AttDetailsCalender";

const AttDetails = () => {
  return (
    <Box>
      <BackButton title={"Attendance Details"}></BackButton>
      <Card p={"2rem"} mt={6} overflowY={"auto"}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="EMPLOYEE INFORMATION" />
          </GridItem>
          <CustomGridItem title={"Employee Name"} value={"Employee_01"} />
          <CustomGridItem title={"Employee ID"} value={"0343"} />
          <CustomGridItem title={"Role"} value={"admin"} />
          <CustomGridItem title={"Mobile Number"} value={"+91 5345353434"} />
        </Grid>
      </Card>
      <AttDetailsCalender />
    </Box>
  );
};

export default AttDetails;
