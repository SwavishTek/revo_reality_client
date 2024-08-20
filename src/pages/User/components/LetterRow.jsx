import React from 'react';
import { Tr, Td, Button, Flex, HStack, Box } from '@chakra-ui/react';
import { CustomText } from '../../../myComponent/CustomText';
import { color } from '../../../consts/color';
import { dateFormate } from '../../../utils/common';
import { useNavigate } from 'react-router-dom';

const LetterRow = ({ item, bgC }) => {
  const navigate = useNavigate();

  const isSigned = item?.status === "signed"

  const handleDownload = () => {
    window.open(item?.url);
  };

  const handleView = () => {
    navigate('/appointmentLetter', { state: item })
  }

  return (
    // <Tr key={item?._id}>
    //   <Td>{item?.name}</Td>
    //   <Td>{item?.employeeName}</Td>
    //   <Td>{item?.dateOfCreation}</Td>
    //   <Td>{item?.createdBy}</Td>
    //   <Td>{item?.status}</Td>
    //   <Td>
    //     <Flex alignItems="center">
    //       {/* <Link to={`/view/${letter?.id}`}> */}
    //       <Button size="sm" colorScheme='brand' variant="link" textDecoration="underline" mr={2} onClick={onClickView}>
    //         View
    //       </Button>
    //       {/* </Link> */}
    //       {/* <Link to={`/download/${letter?.id}`}> */}
    //       <Button size="sm" colorScheme='brand' variant="link" textDecoration="underline" onClick={onClickDownload}>
    //         Download
    //       </Button>
    //       {/* </Link> */}
    //     </Flex>
    //   </Td>
    // </Tr>
    <HStack
      width={'100%'}
      bg={bgC ? color.lightPink : 'white'}
      padding={'10px 0px'}
      borderBottom={`1px solid ${color.borderGray}`}
    >
      <Box
        width={'35%'}
      >
        <CustomText>{item?.name || 'N/A'}</CustomText>
      </Box>
      <Box
        width={'20%'}
      >
        <CustomText>
          {dateFormate(item?.createdAt)}
        </CustomText>
      </Box>
      <Box
        width={'25%'}
      >
        <CustomText>
          {item?.role || 'N/A'}
        </CustomText>
      </Box>
      <Box
        width={'10%'}
      >
        <CustomText>{item?.status || 'N/A'}</CustomText>
      </Box>
      <Box
        width={'10%'}
      >
        <HStack>
          <CustomText
            color={color.secondaryBtn}
            fontWeight='500'
            cursor={'pointer'}
            onClick={isSigned ? handleDownload : handleView}
          >View</CustomText>
          {/* <CustomText
            color={color.secondaryBtn}
            fontWeight='500'
            cursor={'pointer'}
            onClick={handleDownload}
          >Download</CustomText> */}
        </HStack>
      </Box>
    </HStack>
  );
};

export default LetterRow;
