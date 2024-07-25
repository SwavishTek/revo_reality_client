import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Title from "../../components/Title";
import CustomGridItem from "../../components/CustomGridItem";
import { useLeaveDetailsQuery } from "../../Queries/leave/useLeaveQuery";
import { useParams } from "react-router-dom";
import { formatDate } from "../../useFunctions/commonFunctions";
import ImagePreview from "../../components/ImagePreview";
import { useLeaveActions } from "../../useFunctions/leave/leaveFunctions";
import LoadButton from "../../components/LoadButton";
import { adminArr, userRolesObj } from "../../utils/menuItems";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import ReviseLeave from "../../components/Leave/ReviseLeave";

const LeaveDetails = () => {
  const { id } = useParams();
  const { data = {}, refetch } = useLeaveDetailsQuery(id);
  const { data: auth } = useProfileQuery();
  const [rejectLoad, setRejectLoad] = useState(false);
  const [approveLoad, setApproveLoad] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [holdLoad, setHoldLoad] = useState(false);
  const { rejectLeaveById, approveLeaveById, onHoldLeaveById } =
    useLeaveActions();

  const handleReject = async () => {
    setRejectLoad(true);
    await rejectLeaveById(id);
    setRejectLoad(false);
  };

  const handleApprove = async () => {
    setApproveLoad(true);
    await approveLeaveById(id);
    setApproveLoad(false);
  };
  const handleOnHold = async () => {
    setHoldLoad(true);
    await onHoldLeaveById(id);
    setHoldLoad(false);
  };

  return (
    <Box>
      <BackButton title={"Leave Detail"}>
        {adminArr.includes(auth?.role) &&
          (data?.status === "new" ||
            data?.status === "onHold" ||
            data?.status === "revise") && (
            <>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <LoadButton
                  isLoading={approveLoad}
                  bg="brand.success"
                  color={"white"}
                  onClick={handleApprove}
                >
                  Approve
                </LoadButton>
                <LoadButton
                  isLoading={holdLoad}
                  bg="brand.info"
                  color={"white"}
                  onClick={handleOnHold}
                >
                  On Hold
                </LoadButton>
                <LoadButton bg="brand.orange" onClick={onOpen} color={"white"}>
                  Revise
                </LoadButton>
                <LoadButton
                  isLoading={rejectLoad}
                  bg="brand.error"
                  color={"white"}
                  onClick={handleReject}
                >
                  Reject
                </LoadButton>
              </Box>
            </>
          )}
      </BackButton>
      <Card p={"2rem"} mt={6}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="EMPLOYEE INFORMATION" />
          </GridItem>
          <CustomGridItem
            title={"Employee Name"}
            value={`${data.name || ""} ${data.lastName || ""}`}
          />
          <CustomGridItem title={"Role"} value={userRolesObj[data?.role]} />
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
      <ReviseLeave
        id={data?._id}
        refetch={refetch}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Box>
  );
};

export default LeaveDetails;
