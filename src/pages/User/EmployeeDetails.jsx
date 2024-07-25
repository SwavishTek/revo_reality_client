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
import CopyedUserIcon from "../../assets/Component 2.svg";
import EditUserIcon from "../../assets/Component 2 (1).svg";
import BlockUserIcon from "../../assets/Vector.svg";
import DeleteUserIcon from "../../assets/Component 2 (2).svg";
import Title from "../../components/Title";
import CustomGridItem from "../../components/CustomGridItem";
import CopyLink from "../../components/CopyLink";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserDetailsQuery } from "../../Queries/user/userUserQuery";
import { formatDate } from "../../useFunctions/commonFunctions";
import ImagePreview from "../../components/ImagePreview";
import { adminArr, userRolesObj, userStatusObj } from "../../utils/menuItems";
import {
  changeUserStatus,
  userPermanantDelete,
} from "../../useFunctions/user/userFunctions";
import { useQueryClient } from "@tanstack/react-query";
import Confirmation from "../../components/Confirmation";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: user, refetch } = useUserDetailsQuery(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: auth } = useProfileQuery();

  const handleStatusChange = async (newStatus) => {
    try {
      const { data } = await changeUserStatus({
        userId: id,
        status: userStatusObj.deactive,
      });
      console.log(data);
      queryClient.refetchQueries(["users"]);
      if (refetch) refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await userPermanantDelete({ userId: id });
      queryClient.refetchQueries(["users"]);
      navigate("/users");
      if (refetch) refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <BackButton
        title={user?._id === auth?._id ? "Profile" : "Employee Detail"}
      >
        {adminArr.includes(auth?.role) && user?._id !== auth?._id && (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              bg="gray.500"
              color={"white"}
              borderRadius={100}
              height={"50px"}
              width={"50px"}
            >
              <img src={CopyedUserIcon} alt="" />
            </Button>
            <Link to={`/users/addEmployee?id=${user?._id}`}>
              <Button
                bg="brand.success"
                color={"white"}
                borderRadius={100}
                height={"50px"}
                width={"50px"}
              >
                <img src={EditUserIcon} alt="" />
              </Button>
            </Link>

            {user?.status === "approved" && (
              <Button
                bg="red.800"
                color={"white"}
                borderRadius={100}
                height={"50px"}
                width={"50px"}
                onClick={handleStatusChange}
              >
                <img src={BlockUserIcon} alt="" />
              </Button>
            )}
            <Button
              bg="red.600"
              color={"white"}
              borderRadius={100}
              height={"50px"}
              width={"50px"}
              onClick={onOpen}
            >
              <img src={DeleteUserIcon} alt="" />
            </Button>
          </Box>
        )}
      </BackButton>
      <Card p={"2rem"} mt={6}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="EMPLOYEE INFORMATION" />
          </GridItem>
          <CustomGridItem
            title={"Employee Name"}
            value={`${user?.name || ""} ${user?.lastName || ""}`}
          />
          {/* <CustomGridItem title={"Employee ID "} value={"Employee_01"} /> */}
          <CustomGridItem title={"Email Address"} value={user?.email} />
          <CustomGridItem title={"Mobile Number "} value={user?.mobile} />
          <CustomGridItem title={"Role"} value={userRolesObj[user?.role]} />
          <CustomGridItem title={"Department"} value={user?.department} />
          <CustomGridItem
            title={"Joining Date"}
            value={user?.dateOfJoining ? formatDate(user?.dateOfJoining) : "NA"}
          />
          <CustomGridItem title={"Package"} value={user?.package} />
          <GridItem colSpan={5} my={4}>
            <Title title="ADDRESS INFORMATION" />
          </GridItem>
          <CustomGridItem
            title={"House/Flat Address"}
            value={user?.currentAddress?.currentAdd}
          />
          <CustomGridItem
            title={"Address line 2:"}
            value={user?.currentAddress?.currentAdd2}
          />
          <CustomGridItem
            title={"City"}
            value={user?.currentAddress?.currentCity || "NA"}
          />
          <CustomGridItem
            title={"State"}
            value={user?.currentAddress?.currentState || "NA"}
          />
          <CustomGridItem
            title={"Country"}
            value={user?.currentAddress?.currentCountry || "NA"}
          />
          <CustomGridItem
            title={"Post Code"}
            value={user?.currentAddress?.currentPostCode || "NA"}
          />
          <GridItem colSpan={5} my={4}>
            <Title title="BANK INFORMATION" />
          </GridItem>
          <CustomGridItem
            title={"Name of Bank"}
            value={user?.bankDetails?.nameOnBank || "NA"}
          />
          <CustomGridItem
            title={"Name on Bank Ac."}
            value={user?.bankDetails?.nameOnBank || "NA"}
          />
          <CustomGridItem
            title={"Account No."}
            value={user?.bankDetails?.accountNumber}
          />
          <CustomGridItem
            title={"Sort Code"}
            value={user?.bankDetails?.sortCode}
          />
          <GridItem colSpan={5} my={4}>
            <Title title="SOCIAL MEDIA LINKS" />
          </GridItem>
          <CustomGridItem
            title={"Facebook"}
            value={
              <CopyLink
                link={
                  "https://www.facebook.com/sharer/sharer.php?u=REVO%20Reality"
                }
              />
            }
          />
          <CustomGridItem
            title={"Instagram"}
            value={
              <CopyLink
                link={
                  "https://www.instagram.com/sharer/sharer.php?u=REVO%20Reality"
                }
              />
            }
          />
          <CustomGridItem
            title={"YouTube"}
            value={
              <CopyLink
                link={
                  "https://www.youtube.com/sharer/sharer.php?u=REVO%20Reality"
                }
              />
            }
          />
          <CustomGridItem
            title={"TikTok"}
            value={
              <CopyLink
                link={
                  "https://www.tiktok.com/sharer/sharer.php?u=REVO%20Reality"
                }
              />
            }
          />
          {/* <GridItem colSpan={5} my={4}>
            <Title title="MESSAGING CHANNELS" />
          </GridItem>
          <CustomGridItem
            title={"WhatsApp"}
            value={
              <CopyLink
                link={
                  "https://www.facebook.com/sharer/sharer.php?u=REVO%20Reality"
                }
              />
            }
          />
          <CustomGridItem
            title={"Telegram"}
            value={
              <CopyLink
                link={
                  "https://www.instagram.com/sharer/sharer.php?u=REVO%20Reality"
                }
              />
            }
          /> */}
          <GridItem colSpan={5} my={4}>
            <Title title="ATTACHMENTS" />
          </GridItem>
          <CustomGridItem
            title={"Offer Letter"}
            value={
              <>
                {user?.offerLetter?.map((item) => (
                  <ImagePreview img={item} />
                ))}
              </>
            }
          />
          <CustomGridItem
            title={"Address Proof"}
            value={
              <>
                {user?.addressProof?.map((item) => (
                  <ImagePreview img={item} />
                ))}
              </>
            }
          />
          <CustomGridItem
            title={"Bank Statements"}
            value={
              <>
                {user?.bankStatement?.map((item) => (
                  <ImagePreview img={item} />
                ))}
              </>
            }
          />
        </Grid>
      </Card>
      <Confirmation onClose={onClose} isOpen={isOpen} onSubmit={deleteUser} />
    </Box>
  );
};

export default EmployeeDetails;
