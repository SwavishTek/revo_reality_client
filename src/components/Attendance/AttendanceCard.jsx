import {
  Box,
  Card,
  Grid,
  GridItem,
  Stack,
  WrapItem,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import CardItem from "../CardItem";
import { Link } from "react-router-dom";

const AttendanceCard = ({ item, color }) => {
  return (
    <Card

    // avatarName={item?.teamName || ""}
    //   avatarSrc={"img"}
    >
      <Link to={`/attendance/${item?._id}`}>
        <Grid templateColumns="repeat(6, 1fr)" gap={10} py={4} px={4}>
          <GridItem>
            <Stack direction={"row"} spacing={6}>
              <Checkbox size="md" justifyContent={"start"} mb={10}>
                {/* <Box
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
                </Box> */}
              </Checkbox>

              <GridItem>
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
              </GridItem>
              <GridItem width="150px">
                <CardItem title={"Employee Name"} value={item?.employeeName} />
              </GridItem>
            </Stack>
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
