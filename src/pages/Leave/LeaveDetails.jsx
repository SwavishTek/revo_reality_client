import { Box, Button, Card, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import BackButton from "../../components/BackButton";
import Title from "../../components/Title";
import CustomGridItem from "../../components/CustomGridItem";
import { useLeaveDetailsQuery } from "../../Queries/leave/useLeaveQuery";
import { useParams } from "react-router-dom";
import { formatDate } from "../../useFunctions/commonFunctions";
import ImagePreview from "../../components/ImagePreview";
import { useLeaveActions } from "../../useFunctions/leave/leaveFunctions";

const LeaveDetails = () => {
  const { id } = useParams();
  const { data = {} } = useLeaveDetailsQuery(id);
  const { rejectLeaveById } = useLeaveActions();

  const handleReject = () => {
    rejectLeaveById(id);
  };

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
          <Button bg="brand.error" color={"white"} onClick={handleReject}>
            Reject
          </Button>
        </Box>
      </BackButton>
      <Card p={"2rem"} mt={6}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="EMPLOYEE INFORMATION" />
          </GridItem>
          <CustomGridItem
            title={"Employee Name"}
            value={`${data.name} ${data.lastName}`}
          />
          <CustomGridItem title={"Role"} value={data.status} />
          <CustomGridItem title={"Mobile Number"} value={data.mobile} />
          <GridItem colSpan={5} my={4}>
            <Title title="LEAVE INFORMAION" />
          </GridItem>
          <CustomGridItem title={"Reason For Leave"} value={data.reason} />
          <CustomGridItem title={"Total Days Of Leave"} value={data.days} />
          <CustomGridItem title={"Leave Type"} value={data.payType} />
          <CustomGridItem
            title={"Start Date"}
            value={formatDate(data.startDate)}
          />
          <CustomGridItem title={"End Date"} value={formatDate(data.endDate)} />
          <CustomGridItem title={"Special Remarks"} value={""} />
          <GridItem colSpan={5} my={4}>
            <Title title="ATTACHMENT" />
          </GridItem>
          <CustomGridItem
            title={"Supported Documents"}
            value={
              <>
                {data?.doc?.map((item) => (
                  <ImagePreview img={item} />
                ))}
              </>
            }
          />
        </Grid>
      </Card>
    </Box>
  );
};

export default LeaveDetails;
