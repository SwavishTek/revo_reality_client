import React from 'react';
import { Tr, Td, Button, Flex } from '@chakra-ui/react';

const LetterRow = ({ item,onClickDownload ,onClickView}) => {
  return (
    <Tr key={item?.id}>
      <Td>{item?.id}</Td>
      <Td>{item?.employeeName}</Td>
      <Td>{item?.dateOfCreation}</Td>
      <Td>{item?.createdBy}</Td>
      <Td>{item?.status}</Td>
      <Td>
        <Flex alignItems="center">
          {/* <Link to={`/view/${letter?.id}`}> */}
            <Button size="sm" colorScheme='brand' variant="link" textDecoration="underline" mr={2} onClick={onClickView}>
              View
            </Button>
          {/* </Link> */}
          {/* <Link to={`/download/${letter?.id}`}> */}
            <Button size="sm" colorScheme='brand' variant="link" textDecoration="underline" onClick={onClickDownload}>
              Download
            </Button>
          {/* </Link> */}
        </Flex>
      </Td>
    </Tr>
  );
};

export default LetterRow;
