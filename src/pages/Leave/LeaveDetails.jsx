import { Box, Button, Card, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import BackButton from "../../components/BackButton";
import Title from "../../components/Title";
import CustomGridItem from "../../components/CustomGridItem";

const LeaveDetails = () => {
  return (
    <Box>
      <BackButton title={"Leave Detail"}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Button bg="brand.success" color={"white"}>
            Approve
          </Button>
          <Button bg="brand.info" color={"white"}>
            On Hold
          </Button>
          <Button bg="brand.orange" color={"white"}>
            Revise
          </Button>
          <Button bg="brand.error" color={"white"}>
            Reject
          </Button>
        </Box>
      </BackButton>
      <Card p={"2rem"} mt={6}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="EMPLOYEE INFORMATION" />
          </GridItem>
          <CustomGridItem title={"Employee Name"} value={"hii"} />
          <CustomGridItem title={"Role"} value={"hii"} />
          <CustomGridItem title={"Mobile Number"} value={"hii"} />
          <GridItem colSpan={5} my={4}>
            <Title title="LEAVE INFORMAION" />
          </GridItem>
          <CustomGridItem title={"Employee Name"} value={"hii"} />
          <CustomGridItem title={"Role"} value={"hii"} />
          <CustomGridItem title={"Mobile Number"} value={"hii"} />
          <CustomGridItem title={"Employee Name"} value={"hii"} />
          <CustomGridItem title={"Role"} value={"hii"} />
          <CustomGridItem title={"Mobile Number"} value={"hii"} />
          <GridItem colSpan={5} my={4}>
            <Title title="ATTACHMENT" />
          </GridItem>
          <CustomGridItem title={"Employee Name"} value={"hii"} />
        </Grid>
      </Card>
    </Box>
  );
};

export default LeaveDetails;
