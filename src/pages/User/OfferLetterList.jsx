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
      <ShadowBox
        containerStyle={{
          marginBottom: `20px`
        }}
      >
        <Text fontWeight={'bold'} fontSize={'1.7rem'} marginBottom={'1rem'}>OFFER LETTERS</Text>
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
          renderItem={(item, index) => (
            // <TeamCard
            //   item={item}
            //   onClickBox={() => navigate(`/teams/${item?._id}`, { state: item })}
            //   onClickCheckbox={(v) => console.log('firscheckBox', v)}
            // />
            <LetterRow
              bgC={index % 2 === 0}
              item={item}
            // onClickView={() => navigate('/appointmentLetter', { state: item })}
            // onClickDownload={() => console.log('view', item?.employeeName)}
            />
          )}
          loadingMessage="Loading teams..."
          errorMessage="Error fetching teams"
          noDataMessage="No Teams In The System"
          gap={0}
        />
      </ShadowBox>

    </MyContainer>
  )
}

export default React.memo(OfferLetterList)