import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Link, useNavigate } from "react-router-dom";
import MyContainer from "../../myComponent/MyContainer";
import { ShadowBox } from "../../myComponent/ShadowBox";
import { MainTitle } from "../../myComponent/MainTitle";
import RowItem from "../../myComponent/RowItem";
import { CustomText } from "../../myComponent/CustomText";

const ProfileSettings = () => {
  const navigate = useNavigate();
  return (
    <MyContainer
      header={'Settings'}
    >
      <ShadowBox
        containerStyle={{
          padding: '50px 70px'
        }}
      >
        <MainTitle title={'SETTING OPTIONS'} mb={5} />
        <TextClickable
          text={'Change Password'}
          onClick={() => navigate('/users/changepassword')}
        />
        <TextClickable
          text={'General Settings'}
          onClick={() => navigate('/users/generalchanges')}
        />
      </ShadowBox>
    </MyContainer>
    // <Box>
    //   <Header title="Settings" />
    //   <Card p={"2rem"} mt={6}>
    //     <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={6}>
    //       <GridItem colSpan={1} my={4}>
    //         <Title title="SETTING OPTIONS" />
    //       </GridItem>
    //       <GridItem>
    //         <Link to={"/users/changepassword"} style={{ fontWeight: "bold" }}>
    //           Change Password
    //         </Link>
    //       </GridItem>
    //       <GridItem>
    //         <Link to={"/users/generalchanges"} style={{ fontWeight: "bold" }}>
    //           General Settings
    //         </Link>
    //       </GridItem>
    //     </Grid>
    //   </Card>
    // </Box>
  );
};

export default ProfileSettings;

const TextClickable = ({
  onClick,
  text,
  mb = 3
}) => {
  return (
    <Box
      onClick={onClick}
      mb={mb}
    >
      <CustomText
        fontWeight="600"
        fontSize="17"
        style={{
          cursor: 'pointer'
        }}
      >
        {text}
      </CustomText>
    </Box>
  )
}
