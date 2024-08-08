import {
  useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReviseLeave from "../../components/Leave/ReviseLeave";
import { color } from "../../consts/color";
import { CustomBtn } from "../../myComponent/CustomBtn";
import MyContainer from "../../myComponent/MyContainer";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import { useLeaveDetailsQuery } from "../../Queries/leave/useLeaveQuery";
import { useLeaveActions } from "../../useFunctions/leave/leaveFunctions";
import { ShadowBox } from "../../myComponent/ShadowBox";
import { CustomText } from "../../myComponent/CustomText";
import { MainTitle } from "../../myComponent/MainTitle";
import RowItem from "../../myComponent/RowItem";
import { userRolesObj, userStatusObj } from "../../utils/menuItems";
import { dateFormate } from "../../utils/common";
import ImagePreview from "../../components/ImagePreview";

const LeaveDetails = () => {
  // const { state } = useLocation();
  // console.log('stateLeaveDetail', state?._id)
  const { id } = useParams();
  console.log('id', id)
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
    <MyContainer
      header={'Leave Detail'}
      isBack
      btnComponent={
        <>
          <CustomBtn
            title={'Approve'}
            isLoading={approveLoad}
            bgColor={color.success}
            onClick={handleApprove}
          />
          <CustomBtn
            title={'On Hold'}
            isLoading={holdLoad}
            bgColor={color.info}
            onClick={handleOnHold}
          />
          <CustomBtn
            title={'Revise'}
            isLoading={approveLoad}
            bgColor={color.warning}
            onClick={onOpen}
          />
          <CustomBtn
            title={'Reject'}
            isLoading={rejectLoad}
            bgColor={color.danger}
            onClick={handleReject}
          />
        </>
      }
    >
    
      <ShadowBox
        containerStyle={{ width: '96%', padding: '50px 50px', marginBottom: '50px' }}
      >
        <MainTitle
          title={'EMPLOYEE  Information '}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Employee Name"}
          value={`${data.name || ""} ${data.lastName || ""} sf sdfdfsdfds s fsdf  sdfsdfsdfdsf  s fsdfsdfsdfdsfdsf s f sdfsf sdfs sd fsdfsdfs sdfd sfsd sd fsdfsdfsdf sd fsdfdsf sd fsdfsdfsdf sdfdsfsdfds sdfdsfsdf`}
        />
        <RowItem
          title={"Role"}
          value={userRolesObj[data?.role]}
        />
        <RowItem
          title={"Mobile Number"}
          value={data?.mobile} mb={10}
        />

        <MainTitle
          title={'LEAVE INFORMAION'}
        />
        <RowItem
          title={"Reason For Leave"}
          value={data.reason}
        />
        <RowItem
          title={"Total Days Of Leave"}
          value={data.days}
        />
        <RowItem
          title={"Leave Type"}
          value={data.payType}
        />
        <RowItem
          title={"Start Date"}
          value={dateFormate(data.startDate)}
        />
        <RowItem
          title={"End Date"}
          value={dateFormate(data.endDate)}
        />
        <RowItem title={"Special Remarks"} value={""} mb={10} />
        <MainTitle
          title={"Special Remarks"} value={""}
        />

        <RowItem
          title={'Supported Documents'}
          img={data?.doc}

        />
      </ShadowBox>

      {/* modal form for revise */}
      <ReviseLeave
        id={data?._id}
        refetch={refetch}
        onClose={onClose}
        isOpen={isOpen}
      />
    </MyContainer>
    // <Box>
    //   <BackButton title={"Leave Detail"}>
    //     {adminArr.includes(auth?.role) &&
    //       (data?.status === "new" ||
    //         data?.status === "onHold" ||
    //         data?.status === "revise") && (
    //         <>
    //           <Box display={"flex"} alignItems={"center"} gap={2}>
    //             <LoadButton
    //               isLoading={approveLoad}
    //               bg="brand.success"
    //               color={"white"}
    //               onClick={handleApprove}
    //             >
    //               Approve
    //             </LoadButton>
    //             <LoadButton
    //               isLoading={holdLoad}
    //               bg="brand.info"
    //               color={"white"}
    //               onClick={handleOnHold}
    //             >
    //               On Hold
    //             </LoadButton>
    //             <LoadButton bg="brand.orange" onClick={onOpen} color={"white"}>
    //               Revise
    //             </LoadButton>
    //             <LoadButton
    //               isLoading={rejectLoad}
    //               bg="brand.error"
    //               color={"white"}
    //               onClick={handleReject}
    //             >
    //               Reject
    //             </LoadButton>
    //           </Box>
    //         </>
    //       )}
    //   </BackButton>
    //   <Card p={"2rem"} mt={6}>
    //     <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
    //       <GridItem colSpan={5} my={4}>
    //         <Title title="EMPLOYEE INFORMATION" />
    //       </GridItem>
    //       <CustomGridItem
    //         title={"Employee Name"}
    //         value={`${data.name || ""} ${data.lastName || ""}`}
    //       />
    //       <CustomGridItem title={"Role"} value={userRolesObj[data?.role]} />
    //       <CustomGridItem title={"Mobile Number"} value={data.mobile} />
    //       <GridItem colSpan={5} my={4}>
    //         <Title title="LEAVE INFORMAION" />
    //       </GridItem>
    //       <CustomGridItem title={"Reason For Leave"} value={data.reason} />
    //       <CustomGridItem title={"Total Days Of Leave"} value={data.days} />
    //       <CustomGridItem title={"Leave Type"} value={data.payType} />
    //       <CustomGridItem
    //         title={"Start Date"}
    //         value={formatDate(data.startDate)}
    //       />
    //       <CustomGridItem title={"End Date"} value={formatDate(data.endDate)} />
    //       <CustomGridItem title={"Special Remarks"} value={""} />
    //       <GridItem colSpan={5} my={4}>
    //         <Title title="ATTACHMENT" />
    //       </GridItem>
    //       <CustomGridItem
    //         title={"Supported Documents"}
    //         value={
    //           <>
    //             {data?.doc?.map((item) => (
    //               <ImagePreview img={item} />
    //             ))}
    //           </>
    //         }
    //       />
    //     </Grid>
    //   </Card>
    //   <ReviseLeave
    //     id={data?._id}
    //     refetch={refetch}
    //     onClose={onClose}
    //     isOpen={isOpen}
    //   />
    // </Box>
  );
};

export default LeaveDetails;
