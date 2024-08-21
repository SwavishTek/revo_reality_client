import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import BackButton from "../../components/BackButton";
import { svg } from "../../assets/svg.js";
import Title from "../../components/Title";
import CustomGridItem from "../../components/CustomGridItem";
import CopyLink from "../../components/CopyLink";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserDetailsQuery } from "../../Queries/user/userUserQuery";
import { formatDate } from "../../useFunctions/commonFunctions";
import ImagePreview from "../../components/ImagePreview";
import { adminArr, userRolesObj, userStatusObj } from "../../utils/menuItems";
import { changeUserStatus, userPermanantDelete } from "../../useFunctions/user/userFunctions";
import { useQueryClient } from "@tanstack/react-query";
import Confirmation from "../../components/Confirmation";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";
import { ShadowBox } from "../../myComponent/ShadowBox";
import { MainTitle } from "../../myComponent/MainTitle";
import RowItem from "../../myComponent/RowItem";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: user, refetch } = useUserDetailsQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: auth } = useProfileQuery();

  const handleStatusChange = async (newStatus) => {
    try {
      await changeUserStatus({ userId: id, status: newStatus });
      queryClient.refetchQueries(["users"]);
      if (refetch) refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async () => {
    try {
      await userPermanantDelete({ userId: id });
      queryClient.refetchQueries(["users"]);
      navigate("/users");
      if (refetch) refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const commonButtonProps = {
    borderRadius: "full",
    height: "50px",
    width: "50px",
    color: "white",
  };

  return (
    <MyContainer
   header={user?._id === auth?._id ? "Profile" : "Employee Detail"}
   isBack
   btnComponent={
        <>
         {adminArr.includes(auth?.role) && user?._id !== auth?._id && (
          <>
          <CustomBtn
            title={<><img src={svg.CopyedUserIcon} alt="Copy" /></>}
            borderRadius={'50%'}
            padding={'10px'}
            bgColor={color.copybtn}
          />
          <CustomBtn
            title={<><img src={svg.EditUserIcon} alt="Edit" /></>}
            borderRadius={'50px'}
            padding={'10px'}
            bgColor={color.success}
          />
          {user?.status === "approved" && (
          <CustomBtn
            title={<><img src={svg.BlockUserIcon} alt="Block" /></>}
            borderRadius={'50px'}
            padding={'10px'}
            bgColor={color.blockbtn}
            onClick={() => handleStatusChange(userStatusObj.deactive)}
          />
          )}
          <CustomBtn
            title={<><img src={svg.DeleteUserIcon} alt="Delete" /></>}
            borderRadius={'50px'}
            padding={'10px'}
            bgColor={color.deletebtn}
            onClick={onOpen}
          />
          </>
           )}
        </>
      }
      >
        <ShadowBox
        containerStyle={{ width: '96%', padding: '50px 50px', marginBottom: '50px' }}
      >
        <MainTitle
          title={'EMPLOYEE  INFORMATION '}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Employee Name"}
          value={`${user?.name || ""} ${user?.lastName || ""}`}
        />
        <RowItem
        containerStyle={{ alignItems: 'flex-start'}}
        title={"Email Address"}
        value={`${user?.email || ""}`}
        />
        <RowItem
        containerStyle={{alignItems: 'flex-start'}}
        title={"Mobile Number"}
        value={`${user?.mobile || ""}`}
        />
        <RowItem
        containerStyle={{alignItems: 'flex-start'}}
        title={"Role"}
        value={userRolesObj[user?.role]}
        />
        <RowItem
        containerStyle={{alignItems: 'flex-start'}}
        title={"Department"}
        value={`${user?.department || ""}`}  mb={10}
        />

       <MainTitle
          title={'ADDRESS  INFORMATION '}
        />
        <RowItem
        containerStyle={{alignItems: 'flex-start'}}
        title={"House/Flat Address"}
        value={user?.currentAddress?.currentAdd}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Address line 2"}
        value={user?.currentAddress?.currentAdd2}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"City"}
        value={user?.currentAddress?.currentCity || "NA"}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"State"}
        value={user?.currentAddress?.currentState || "NA"}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Country"}
        value={user?.currentAddress?.currentCountry || "NA"}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Post Code"}
        value={user?.currentAddress?.currentPostCode || "NA"}
        mb={10}
        />
        <MainTitle
          title={'BANK  INFORMATION '}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Name of Bank"}
        value={user?.bankDetails?.nameOnBank || "NA"}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Name on Bank Ac."}
        value={user?.bankDetails?.nameOnBank || "NA"}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Account No."}
        value={user?.bankDetails?.accountNumber}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Sort Code"}
        value={user?.bankDetails?.sortCode}
        mb={10}
        />
        
        <MainTitle
          title={'SOCIAL MEDIA LINKS '}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Facebook"}
        value={<CopyLink link={user?.facebook || ""} />}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Instagram"}
        value={<CopyLink link={user?.instagram || ""} />}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"YouTube"}
        value={<CopyLink link={user?.youtube || ""} />}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"TikTok"}
        value={<CopyLink link={user?.tiktok || ""} />}
        mb={10}
        />

       <MainTitle
          title={'ATTACHMENTS '}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Offer Letter"}
        img={user?.offerLetter || []}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Address Proof"}
        img={user?.addressProof || []}
        />
        <RowItem
        containerStyle={{alignItem: 'flex-start'}}
        title={"Bank Statements"}
        img={user?.bankStatement || []}
        />
      </ShadowBox>
      <Confirmation onClose={onClose} isOpen={isOpen} onSubmit={deleteUser} />
      </MyContainer>
   /* <Box >
      <BackButton title={user?._id === auth?._id ? "Profile" : "Employee Detail"}>
        {adminArr.includes(auth?.role) && user?._id !== auth?._id && (
          <Box display="flex" alignItems="center" gap={2}>
            <Button bg="gray.500" {...commonButtonProps}>
              <img src={CopyedUserIcon} alt="Copy" />
            </Button>
            <Link to={`/users/addEmployee?id=${user?._id}`}>
              <Button bg="brand.success" {...commonButtonProps}>
                <img src={EditUserIcon} alt="Edit" />
              </Button>
            </Link>
            {user?.status === "approved" && (
              <Button
                bg="red.800"
                {...commonButtonProps}
                onClick={() => handleStatusChange(userStatusObj.deactive)}
              >
                <img src={BlockUserIcon} alt="Block" />
              </Button>
            )}
            <Button
              bg="red.600"
              {...commonButtonProps}
              onClick={onOpen}
            >
              <img src={DeleteUserIcon} alt="Delete" />
            </Button>
          </Box>
        )}
      </BackButton>
      <Card p="2rem" mt={6} overflow="hidden"  overflowX="auto">
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="EMPLOYEE INFORMATION" />
          </GridItem>
          <CustomGridItem
            title="Employee Name"
            value={`${user?.name || ""} ${user?.lastName || ""}`}
          />
          <CustomGridItem title="Email Address" value={user?.email} />
          <CustomGridItem title="Mobile Number" value={user?.mobile} />
          <CustomGridItem title="Role" value={userRolesObj[user?.role]} />
          <CustomGridItem title="Department" value={user?.department} />
          <CustomGridItem
            title="Joining Date"
            value={user?.dateOfJoining ? formatDate(user?.dateOfJoining) : "NA"}
          />
          <CustomGridItem title="Package" value={user?.package} />
          <GridItem colSpan={5} my={4}>
            <Title title="ADDRESS INFORMATION" />
          </GridItem>
          <CustomGridItem
            title="House/Flat Address"
            value={user?.currentAddress?.currentAdd}
          />
          <CustomGridItem
            title="Address line 2"
            value={user?.currentAddress?.currentAdd2}
          />
          <CustomGridItem
            title="City"
            value={user?.currentAddress?.currentCity || "NA"}
          />
          <CustomGridItem
            title="State"
            value={user?.currentAddress?.currentState || "NA"}
          />
          <CustomGridItem
            title="Country"
            value={user?.currentAddress?.currentCountry || "NA"}
          />
          <CustomGridItem
            title="Post Code"
            value={user?.currentAddress?.currentPostCode || "NA"}
          />
          <GridItem colSpan={5} my={4}>
            <Title title="BANK INFORMATION" />
          </GridItem>
          <CustomGridItem
            title="Name of Bank"
            value={user?.bankDetails?.nameOnBank || "NA"}
          />
          <CustomGridItem
            title="Name on Bank Ac."
            value={user?.bankDetails?.nameOnBank || "NA"}
          />
          <CustomGridItem
            title="Account No."
            value={user?.bankDetails?.accountNumber}
          />
          <CustomGridItem
            title="Sort Code"
            value={user?.bankDetails?.sortCode}
          />
          <GridItem colSpan={5} my={4}>
            <Title title="SOCIAL MEDIA LINKS" />
          </GridItem>
          <CustomGridItem
            title="Facebook"
            value={<CopyLink link="https://www.facebook.com/sharer/sharer.php?u=REVO%20Reality" />}
          />
          <CustomGridItem
            title="Instagram"
            value={<CopyLink link="https://www.instagram.com/sharer/sharer.php?u=REVO%20Reality" />}
          />
          <CustomGridItem
            title="YouTube"
            value={<CopyLink link="https://www.youtube.com/sharer/sharer.php?u=REVO%20Reality" />}
          />
          <CustomGridItem
            title="TikTok"
            value={<CopyLink link="https://www.tiktok.com/sharer/sharer.php?u=REVO%20Reality" />}
          />
          <GridItem colSpan={5} my={4}>
            <Title title="ATTACHMENTS" />
          </GridItem>
          <CustomGridItem
            title="Offer Letter"
            value={user?.offerLetter?.map((item, index) => (
              <ImagePreview key={index} img={item} />
            ))}
          />
          <CustomGridItem
            title="Address Proof"
            value={user?.addressProof?.map((item, index) => (
              <ImagePreview key={index} img={item} />
            ))}
          />
          <CustomGridItem
            title="Bank Statements"
            value={user?.bankStatement?.map((item, index) => (
              <ImagePreview key={index} img={item} />
            ))}
          />
        </Grid>
      </Card>
      <Confirmation onClose={onClose} isOpen={isOpen} onSubmit={deleteUser} />
    </Box>*/
  );
};


export default EmployeeDetails;