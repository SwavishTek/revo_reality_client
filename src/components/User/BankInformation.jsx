import { Box, Button, FormControl, FormLabel, Grid, GridItem, Input, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import './uploadbutton.css';
import { AttachmentIcon } from '@chakra-ui/icons';

const BankInformation = () => {
    const [fileName, setFileName] = useState("Upload Bank Statement")
    return (
        <>
            <Box bg={"white"} p={'2.5rem'} border={'1px solid #DCDCDC'} borderRadius={'6px'}>

                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>BANK INFORMATION </h3>
                <hr style={{ color: '#DCDCDC', marginTop: '6px', width: '88%', marginBottom: '1.5rem' }}></hr>
                <Grid templateColumns='repeat(2, 1fr)' gap={6} >
                    <GridItem w='100%' h='10' mb={8}>
                        <FormControl id="bankname" >
                            <FormLabel>Bank Name</FormLabel>
                            <Input type="text" placeholder="Enter your bank" />
                        </FormControl>
                    </GridItem>
                    <GridItem w='100%' h='10' mb={8}>
                        <FormControl id="bankaccount" >
                            <FormLabel>Name on Bank Account</FormLabel>
                            <Input type="text" placeholder="Enter the name on bank account" />
                        </FormControl>
                    </GridItem>
                    <GridItem w='100%' h='10' mb={8}>
                        <FormControl id="sortcode" >
                            <FormLabel>Sort Code</FormLabel>
                            <Input type="text" placeholder="Enter your sort code" />
                        </FormControl>
                    </GridItem>
                    <GridItem w='100%' h='10' mb={8}>
                        <FormControl id="accountnumber" >
                            <FormLabel>Account Number</FormLabel>
                            <Input type="text" placeholder="Enter your account number" />
                        </FormControl>
                    </GridItem>
                </Grid>
                <FormControl id="house" style={{ marginTop: '2rem' }} >
                    <FormLabel>Bank Statements</FormLabel>
                    <div className='uploadcruse' onClick={() => document.querySelector(".input-field").click()}  >
                        <Input type="file" placeholder="Upload bank statements" className='input-field' hidden
                            onChange={({ target: { files } }) => {
                                files[0] && setFileName(files[0].name)
                            }}
                        />
                        <AttachmentIcon />
                        {fileName}
                    </div>
                </FormControl>

                <Stack spacing={6} direction='row' align='center' marginTop={'1.5rem'}>
                    <Button size='md'
                        fontSize='18px'
                        colorScheme='brand'
                    >
                        Save
                    </Button>
                    <Button
                        size='md'
                        fontSize='18px'
                        colorScheme='brand'
                    >
                        Save & Next
                    </Button>
                </Stack>

            </Box>
        </>
    )
}

export default BankInformation