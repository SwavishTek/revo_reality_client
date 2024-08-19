import React from 'react';
import { Tr, Td, Button, Flex, HStack, Box } from '@chakra-ui/react';
import { CustomText } from '../../../myComponent/CustomText';
import { color } from '../../../consts/color';
import { dateFormate } from '../../../utils/common';

const LetterRow = ({ item, onClickDownload, onClickView, bgC }) => {
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
        width={'30%'}
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
          {item?.createdBy || 'N/A'}
        </CustomText>
      </Box>
      <Box
        width={'10%'}
      >
        <CustomText>{item?.status || 'N/A'}</CustomText>
      </Box>
      <Box
        width={'15%'}
      >
        <HStack>
          <CustomText
            color={color.secondaryBtn}
            fontWeight='500'
            cursor={'pointer'}
            onClick={onClickView}
          >View</CustomText>
          <CustomText
            color={color.secondaryBtn}
            fontWeight='500'
            cursor={'pointer'}
            onClick={onClickDownload}
          >Download</CustomText>
        </HStack>
      </Box>
    </HStack>
  );
};

export default LetterRow;
