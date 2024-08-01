import React from "react";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import EmployeeStatus from "../../components/Dashboard/EmployeeStatus";
import Title from "../../components/Title";
import PieChartComponent from "../../components/Dashboard/EmployeeStatus";
import ItemCard from "../../components/ItemCard";
import DashboardListing from "../../components/Dashboard/DashboardListing";
import { useGetHolidayCount } from "../User/useQuery/useHolidayCountQuery";

const Dashboard = () => {
  const { data } = useProfileQuery();

  const {data:senddata} = useGetHolidayCount({ type:'monthly' });
  console.log('HolidayMonthly', senddata);

  const employeeStatusData = [
    { title: "NEW", value: 15, color: "#CDE7FF" },
    { title: "DRAFT", value: 15, color: "#FF8A00" },
    { title: "ACTIVE/APPROVED ", value: 8, color: "#4ABC04" },
    { title: "DEACTIVATED ", value: 5, color: "#740707" },
    { title: "ACTIVE ", value: 8, color: "#FF0000" },
  ];

  const yearlyWorkingDays = [
    { title: "Working Days ", value: 8, color: "#CDE7FF" },
    { title: "Public Holidays ", value: 8, color: "#4ABC04" },
  ];

  const monthlyWorkingDays = [
    { title: "Working Days ", value: 8, color: "#F6C244" },
    { title: "Public Holidays ", value: 8, color: "#FF8A00" },
  ];

  return (
    <div>
      <Text fontWeight={"medium"} fontSize={"1.8rem"} mb={4}>
        Dashboard
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={2}>
        <GridItem>
          <PieChartComponent
            title={"Employee Status"}
            data={employeeStatusData}
          />
        </GridItem>
        <GridItem>
          <PieChartComponent
            title={"Working Days This Year"}
            data={yearlyWorkingDays}
          />
        </GridItem>
        <GridItem>
          <PieChartComponent
            title={"Working Days This Month"}
            data={monthlyWorkingDays}
          />
        </GridItem>
        <GridItem>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <ItemCard title={"Present Employees"} value={"44"} />
            <ItemCard title={"Absent Employees"} value={"04"} />
            <ItemCard title={"Leave Applications"} value={"03"} />
            <ItemCard title={"New Employees Added"} value={"09"} />
          </Box>
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6}>
        <GridItem>
          <DashboardListing
            title={"Employees on leave"}
            count={"004"}
            color="brand.success"
          />
        </GridItem>
        <GridItem>
          <DashboardListing
            title={"Employees absent today"}
            count={"004"}
            color="brand.error"
          />
        </GridItem>
        <GridItem>
          <DashboardListing
            title={"Total leave application"}
            count={"004"}
            color="brand.orange"
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default React.memo(Dashboard);
