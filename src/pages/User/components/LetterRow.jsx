import React from 'react';
import { Tr, Td, Button, Flex, HStack, Box } from '@chakra-ui/react';
import { CustomText } from '../../../myComponent/CustomText';

const LetterRow = ({ item, onClickDownload, onClickView }) => {
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
      bg={'red'}
    >
      <Box
        width={'25%'}
      >
        <CustomText>Md Javed ali khan</CustomText>
      </Box>
      <Box
        width={'20%'}
      >
        <CustomText>
          {'08/07/2024, 10:00AM'}
        </CustomText>
      </Box>
      <Box
        width={'20%'}
      >
        <CustomText>
          Kashif kahna butto
        </CustomText>
      </Box>
      <Box
        width={'15%'}
      ></Box>
      <Box
        width={'20%'}
      ></Box>
    </HStack>
  );
};

export default LetterRow;
