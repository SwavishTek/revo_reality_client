import { Box, Button, Grid, GridItem, Input, Stack, Text} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import InputField from '../../components/InputField'
import DatePicker from 'react-datepicker'
import CustomSelect from '../../components/BasicSelect'

const OfferLetter = () => {
  return (
        <Box>
         <Header title="Offer Letters">
         <Box display={"flex"} alignItems={"center"} gap={2}>
          <Link to={"/"}>
            <Button colorScheme="brand">Employees</Button>
          </Link>
          <Link to={"/"}>
            <Button colorScheme="brand">Create Offer Letter</Button>
          </Link>
          </Box>
         </Header>
         <Box
        bg={"white"}
        m={"2rem 5rem"}
        p={"2.5rem"}
        border={"1px solid #DCDCDC"}
        borderRadius={"6px"}
      >
        <Text textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'} marginBottom={'1rem'}>Offer Letter</Text>     
         <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <InputField
              id="candname"
              label="Candidate Name"
              placeholder="Enter candidate name"
              value={""}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="email"
              label="Email Address"
              placeholder="Enter candidate email address"
              value={""}
            />
          </GridItem>
          <GridItem>
            <Text fontWeight={"semibold"} mb={1}>
              Joining Date
            </Text>
            <DatePicker
              name="dateOfJoining"
              placeholderText="Select date"
              customInput={<Input />}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              label={"Role"}
              id={"role"}
              placeholder="Select Role"
              options={[]}
              value={''}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="department"
              label="Department"
              placeholder="Enter candidate department"
              value={''}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="package"
              label="Package"
              placeholder="Enter candidate package"
              value={''}
            />
          </GridItem>
          </Grid>
          <Stack mt={'3rem'} spacing={6} direction="row" align="center" justifyContent="center">
          <Button
            size="md"
            fontSize="18px"
            colorScheme="brand"
            fontWeight={'normal'}
          >
            Create DocUsign
          </Button>
          </Stack>
          </Box>
        </Box>

  )
}

export default OfferLetter