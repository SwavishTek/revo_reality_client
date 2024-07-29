import {
  // Card,
  Grid,
  GridItem,
  // Stack,
  // WrapItem,
  // Text,
  // Checkbox,
} from "@chakra-ui/react";
import Card from "../Card";
import React from "react";
import CardItem from "../CardItem";
import { Link } from "react-router-dom";

const AttendanceCard = ({ item, color }) => {
  return (
    <Card
      minWidth={1000}
      backgroundColor={color}
      avatarName={item?.employeeName || ""}
      color="#fff"
    >
      <Link to={`/attendance/${item._id}`}>
        <Grid templateColumns="repeat(6, 1fr)" gap={10}>
          <GridItem>
            {/* <Checkbox size="md" justifyContent={"start"} mb={10}></Checkbox> */}
            {/* <GridItem>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="45px"
                  height="45px"
                  borderRadius="50%"
                  bg={color}
                  color="white"
                  fontSize="24px"
                  fontWeight="bold"
                >
                  <Text>E</Text>
                </Box>
              </GridItem> */}
            <GridItem width="150px">
              <CardItem title={"Employee Name"} value={item?.employeeName} />
            </GridItem>
          </GridItem>
          <GridItem>
            <CardItem title={"Email Address:"} value={item?.email} />
          </GridItem>
          <GridItem>
            <CardItem title={"Mobile Number:"} value={item?.mobileNumber} />
          </GridItem>
          <GridItem>
            <CardItem title={"Role:"} value={item?.role} />
          </GridItem>
          <GridItem>
            <CardItem title={"Joining Date:"} value={item?.joiningDate} />
          </GridItem>
        </Grid>
      </Link>
    </Card>
  );
};

export default AttendanceCard;
