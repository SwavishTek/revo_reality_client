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
import MyContainer from '../../myComponent/MyContainer'
import { CustomBtn } from '../../myComponent/CustomBtn'
import { color } from '../../consts/color'
import { useNavigate } from "react-router-dom";
import { ShadowBox } from '../../myComponent/ShadowBox'
import { useGetOfferLetterList } from '../AppointmentLetter/useOfferLetterQuery'
import InfiniteScrollList from '../../myComponent/InfiniteScrollList'

const OfferLetterList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
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
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching
  } = useGetOfferLetterList({
    search: ''
  })
  console.log('data', data)
  return (
    <MyContainer
      header={'Offer Letters'}
      btnComponent={<>
        <CustomBtn title={'Employees'}
          bgColor={color.primaryBtn}
          onClick={() => navigate('/users/offerletterlist')} />
        <CustomBtn title={'Create Offer Letter'}
          bgColor={color.secondaryBtn}
          onClick={() => navigate('/users/offerletterlist')}
        />
      </>}
    >
      <Filters onSearchChange={setSearch} />
      <ShadowBox>


        <Text fontWeight={'bold'} fontSize={'1.7rem'} marginBottom={'1rem'}>OFFER LETTERS</Text>
        <Divider w={'20%'} borderColor={'#9A4D49'} borderWidth={'1px'} />
        {/* <TableContainer mt={'2rem'}>
          <Table variant='striped' color={'#000'} colorScheme='gray'>
            <LetterHeader columns={columns} />
            <Tbody>
              {offerLetters?.map(item => (
                <LetterRow key={item.id} item={item} onClickDownload={() => console.log(item?.employeeName)} onClickView={() => console.log(item?.employeeName)} />
              ))}
              
            </Tbody>
          </Table>
        </TableContainer> */}
        <InfiniteScrollList
          data={data || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          isFetching={isFetching}
          renderItem={(item) => (
            // <TeamCard
            //   item={item}
            //   onClickBox={() => navigate(`/teams/${item?._id}`, { state: item })}
            //   onClickCheckbox={(v) => console.log('firscheckBox', v)}
            // />
            <LetterRow key={item._id} item={item}
              onClickDownload={() => console.log(item?.employeeName)}
              onClickView={() => console.log(item?.employeeName)} />
          )}
          loadingMessage="Loading teams..."
          errorMessage="Error fetching teams"
          noDataMessage="No Teams In The System"
        />
      </ShadowBox>

    </MyContainer>
  )
}

export default React.memo(OfferLetterList)