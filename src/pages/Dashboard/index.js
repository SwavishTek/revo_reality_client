import React from "react";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import PieChartComponent from "../../components/Dashboard/EmployeeStatus";
import ItemCard from "../../components/ItemCard";
import DashboardListing from "../../components/Dashboard/DashboardListing";
import { useGetHolidayCount } from "../User/useQuery/useHolidayCountQuery";

const Dashboard = () => {
  const { data } = useProfileQuery();

  // Fetch both yearly and monthly holiday count data
  const { data: yearlyData } = useGetHolidayCount({ type: 'yearly' });
  const { data: monthlyData } = useGetHolidayCount({ type: 'monthly' });

  console.log('YearlyHolidayData', yearlyData);
  console.log('MonthlyHolidayData', monthlyData);

  return (
    <div>
      <Text fontWeight={"medium"} fontSize={"1.8rem"} mb={4}>
        Dashboard
      </Text>

      <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={2}>
        <GridItem>
          <PieChartComponent
            title={"Employee Status"}
            data={[
              { title: "NEW", value: 15, color: "#CDE7FF" },
              { title: "DRAFT", value: 15, color: "#FF8A00" },
              { title: "ACTIVE/APPROVED", value: 8, color: "#4ABC04" },
              { title: "DEACTIVATED", value: 5, color: "#740707" },
              { title: "ACTIVE", value: 8, color: "#FF0000" },
            ]}
          />
        </GridItem>
        <GridItem>
          <PieChartComponent
            title={"Working Days This Year"}
            data={yearlyData || []} // Display yearly data
          />
        </GridItem>
        <GridItem>
          <PieChartComponent
            title={"Working Days This Month"}
            data={monthlyData || []} // Display monthly data
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
