import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import ReviseLeave from "../../components/Leave/ReviseLeave";
import { color } from "../../consts/color";
import { CustomBtn } from "../../myComponent/CustomBtn";
import MyContainer from "../../myComponent/MyContainer";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import { useLeaveDetailsQuery } from "../../Queries/leave/useLeaveQuery";
import { useLeaveActions } from "../../useFunctions/leave/leaveFunctions";
import { ShadowBox } from "../../myComponent/ShadowBox";
import { MainTitle } from "../../myComponent/MainTitle";
import RowItem from "../../myComponent/RowItem";
import { adminArr, userRolesObj, userStatusObj } from "../../utils/menuItems";
import { dateFormate } from "../../utils/common";
import ImagePreview from "../../components/ImagePreview";
import { useQueryClient } from "@tanstack/react-query";
import { useUserDetailsQuery } from "../../Queries/user/userUserQuery";
import dayjs from "dayjs";

const isDateTodayOrAfter = (date) => {
  const givenDate = dayjs(date);
  const today = dayjs();

  return givenDate.isSame(today, 'day') || givenDate.isAfter(today, 'day');
};

const LeaveDetails = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data = {}, refetch } = useLeaveDetailsQuery(id);
  const { data: auth } = useProfileQuery();
  const [rejectLoad, setRejectLoad] = useState(false);
  // const [cancelLoad, setCancelLoad] = useState(false);
  const [approveLoad, setApproveLoad] = useState(false);
  const [reviseLoad, setReviseLoad] = useState(false);
  const [holdLoad, setHoldLoad] = useState(false);
  const [cancelLoad, setCancelLoad] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const isSupSubAdmin = adminArr.includes(auth?.role) && data?.status !== userStatusObj.cancelled;

  const {
    rejectLeaveById,
    approveLeaveById,
    onHoldLeaveById,
    cancelLeaveById,
  } = useLeaveActions();

  const handleReject = async () => {
    setRejectLoad(true);
    try {
      await rejectLeaveById(id);
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
      refetch(); // Refresh data
    } catch (error) {
      console.error("Error rejecting leave:", error.message);
    } finally {
      setRejectLoad(false);
    }
  };

  const handleApprove = async () => {
    setApproveLoad(true);
    try {
      await approveLeaveById(id);
      refetch(); // Refresh data
    } catch (error) {
      console.error("Error approving leave:", error.message);
    } finally {
      setApproveLoad(false);
    }
  };

  const handleOnHold = async () => {
    setHoldLoad(true);
    try {
      await onHoldLeaveById(id);
      refetch(); // Refresh data
    } catch (error) {
      console.error("Error putting leave on hold:", error.message);
    } finally {
      setHoldLoad(false);
    }
  };

  const handleCancel = async () => {
    setCancelLoad(true);
    try {
      await cancelLeaveById({ id });
      queryClient.refetchQueries(["leaves"]);
      queryClient.setQueriesData(["leave", id], () => data.data);
      // refetch(); // Refresh data
    } catch (error) {
      console.error("Error canceling leave:", error.message);
    } finally {
      setCancelLoad(false);
    }
  };

  const handleButtonClick = (callback) => (event) => {
    event.stopPropagation();
    callback();
  };

  return (
    <MyContainer
      header={"Leave Detail"}
      isBack
      btnComponent={
        isSupSubAdmin ? (
          <>
            {![userStatusObj.approve, userStatusObj.cancel].includes(
              data?.status
            ) && (
                <>
                  <CustomBtn
                    title={"Approve"}
                    isLoading={approveLoad}
                    bgColor={color.success}
                    onClick={handleButtonClick(handleApprove)}
                  />
                  <CustomBtn
                    title={"On Hold"}
                    isLoading={holdLoad}
                    bgColor={color.info}
                    onClick={handleButtonClick(handleOnHold)}
                  />
                  <CustomBtn
                    title={"Revise"}
                    isLoading={reviseLoad}
                    bgColor={color.warning}
                    onClick={handleButtonClick(onOpen)}
                  />
                  <CustomBtn
                    title={"Reject"}
                    isLoading={rejectLoad}
                    bgColor={color.danger}
                    onClick={handleButtonClick(handleReject)}
                  />
                </>
              )}
            {/* {console.log('startData',data?.startDate)} */}

            {data?.status === userStatusObj.approve &&
              isDateTodayOrAfter(data?.startDate) && (
                <CustomBtn
                  title={"Cancel"}
                  isLoading={cancelLoad}
                  // bgColor={color.danger}
                  onClick={handleCancel}
                />
              )}
          </>
        ) : null
      }
    >
      <ShadowBox
        containerStyle={{
          width: "96%",
          padding: "50px 50px",
          marginBottom: "50px",
        }}
      >
        <MainTitle title={"EMPLOYEE INFORMATION"} />
        <RowItem
          containerStyle={{ alignItems: "flex-start" }}
          title={"Employee Name"}
          value={`${data.name || ""} ${data.lastName || ""}`}
        />
        <RowItem title={"Role"} value={userRolesObj[data?.role]} />
        <RowItem title={"Mobile Number"} value={data?.mobile} />
        <RowItem title={"Status"} value={data?.status} mb={10} />
        <MainTitle title={"LEAVE INFORMATION"} />
        <RowItem title={"Reason For Leave"} value={data.reason} />
        <RowItem title={"Total Days Of Leave"} value={data.days} />
        <RowItem title={"Leave Type"} value={data.payType} />
        <RowItem title={"Start Date"} value={dateFormate(data.startDate)} />
        <RowItem title={"End Date"} value={dateFormate(data.endDate)} />
        <RowItem title={"Special Remarks"} value={""} mb={10} />
        <MainTitle title={"Special Remarks"} value={""} />
        <RowItem title={"Supported Documents"} img={data?.doc} />
      </ShadowBox>

      <ReviseLeave
        id={data?._id}
        refetch={refetch}
        onClose={onClose}
        isOpen={isOpen}
      />
    </MyContainer>
  );
};

export default LeaveDetails;
