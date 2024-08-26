import React, { useState } from "react";
import MyContainer from "../../myComponent/MyContainer";
import { Box, Text } from "@chakra-ui/react";
import { svg } from "../../assets/svg";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { useLocation } from "react-router-dom";

const DocuSuccess = () => {
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const { state } = useLocation();
  const handleButtonClick = async () => {
    setIsLoadingBtn(true);
    setTimeout(() => setIsLoadingBtn(false), 2000);
  };
  console.log('state', state)
  const handleDownload = () => {
    window.open(state?.data?.url);
  };

  return (
    <MyContainer
      header={<img src={svg.logos} />}
      containerStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      <Box
        width="450px"
        height="350px"
        padding="20px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        boxShadow="2.64px 2.64px 7.91px 0px #0000002E"
        backgroundColor="#fff"
        borderRadius="10px"
        marginTop="6%"
        position="relative"
        left="37%"
      >
        <Text fontSize="1.5rem" fontWeight="700" marginBottom="2rem" textColor={'#42AA01'}>
          Submission Successful
        </Text>
        <Text textAlign="center" fontWeight="500" marginBottom="2rem">
          Congratulations! You have successfully submitted your signed Offer Letter
        </Text>
        <CustomBtn
          title="View and Download"
          isLoading={isLoadingBtn}
          onClick={handleDownload}
        />
      </Box>
    </MyContainer>
  );
};

export default DocuSuccess;
