import React from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import NoTeamImage from "../../../assets/NoTeam.svg";
import NoUser from "../../../assets/NoUser.svg";
import NoAttendance from "../../../assets/NoAttendance.svg";
import NoLeave from "../../../assets/NoAttendance.svg";
import NoNotification from "../../../assets/NoNotifications.svg";

const images={
  NoUser,
  NoTeamImage,
  NoAttendance,
  NoLeave,
  NoNotification
}

const NoDataFound = ({  message,name }) => (
  <VStack spacing={4} align="center" justify="center" height="100%" textAlign="center">
    <Box>
      <Image
        marginTop={'4rem'}
        src={images?.[name]||NoTeamImage}
        alt="No Data"      
        objectFit="contain"
      />
    </Box>
    <Text fontSize="lg" fontWeight="bold">
      {message}
    </Text>
  </VStack>
);

export default NoDataFound;
