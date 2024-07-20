import React from 'react'
import PersonalForm from '../../components/User/PersonalForm'
import AddIcon from '../../assets/Vector.png';
import { Box, Button } from '@chakra-ui/react';
import BankInformation from '../../components/User/BankInformation';
import UploadOfferLetter from '../../components/User/UploadOfferLetter';
import StepperAdd from '../../components/User/StepperAdd';

const AddEmployee = () => {
  return (
    <div>
    <Box display={'flex'} justifyContent={'space-between'} mb={'2rem'} mt={'1rem'} >
                <div style={{ display: 'flex' }}>
                    <img src={AddIcon} style={{ width:'40px', height: '40px', }} alt='addicon' />
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', paddingLeft: '1.2rem' }}>
                        Add Employees</h3>
                </div>
                <Button
                    size='md'
                    fontSize='18px'
                    colorScheme='brand'>
                    Create Offer
                </Button>
            </Box>
            <StepperAdd />
        {/* <PersonalForm /> */}
        {/* 2 */}
          {/*<BankInformation />*/}
        {/* 3 */}
        <UploadOfferLetter />
    </div>
  )
}

export default AddEmployee