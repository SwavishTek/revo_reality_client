import { Box, Button, Divider, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import Filters from '../../components/Filters'
import {
  Table,
  Tbody,
  TableContainer,
} from '@chakra-ui/react'
import LetterHeader from './components/LetterHeader'
import LetterRow from './components/LetterRow'

const OfferLetterList = () => {
  const [search, setSearch] = useState("");
  const columns = [
    'ID',
    'Employee Name',
    'Date of Creation',
    'Created By',
    'Status',
    'Action'
  ];

  const offerLetters = [
    {
      id: 1,
      employeeName: 'Sam 1',
      dateOfCreation: '08/07/2024, 10:00AM',
      createdBy: 'HR_01',
      status: 'Viewed Signed',
      action: 'Active',
    },
    {
      id: 2,
      employeeName: 'Sam 2',
      dateOfCreation: '08/07/2024, 10:00AM',
      createdBy: 'HR_01',
      status: 'Viewed Signed',
      action: 'Active',
    },
    {
      id: 3,
      employeeName: 'Sam 3',
      dateOfCreation: '08/07/2024, 10:00AM',
      createdBy: 'HR_01',
      status: 'Viewed Signed',
      action: 'Active',
    },
  ];

  return (
    <VStack spacing={4} align="stretch" height="100%" width={"100%"} p={4}>
      <Box>
        <Header title="Offer Letters">
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Link to={"/"}>
              <Button colorScheme="brand">Employees</Button>
            </Link>
            <Link to={"/users/offerletter"}>
              <Button colorScheme="brand">Create Offer Letter</Button>
            </Link>
          </Box>
        </Header>
        <Filters onSearchChange={setSearch} />
        <Box
          bg={"white"}
          p={"2.5rem"}
          border={"1px solid #DCDCDC"}
          borderRadius={"6px"}
        >
          <Text fontWeight={'bold'} fontSize={'1.7rem'} marginBottom={'1rem'}>OFFER LETTERS</Text>
          <Divider w={'20%'} borderColor={'#9A4D49'} borderWidth={'1px'} />
          <TableContainer mt={'2rem'}>
            <Table variant='striped' color={'#000'} colorScheme='gray'>
              <LetterHeader columns={columns} />
              <Tbody>
                {offerLetters?.map(item => (
                  <LetterRow key={item.id} item={item} onClickDownload={()=>console.log(item?.employeeName)} onClickView={()=>console.log(item?.employeeName)}/>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </VStack>
  )
}

export default OfferLetterList