import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import './uploadbutton.css';
import { AttachmentIcon } from '@chakra-ui/icons';

const UploadOfferLetter = () => {
    const [fileName, setFileName] = useState("Upload offer letter")

    return (
        <>
            <Box bg={"white"} p={'2.5rem'} border={'1px solid #DCDCDC'} borderRadius={'6px'}>

                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>UPLOAD OFFER LETTER </h3>
                <hr style={{ color: '#DCDCDC', marginTop: '6px', width: '88%', marginBottom: '1.5rem' }}></hr>
                <FormControl id="bankstatements" style={{ marginTop: '2rem' }} >
                    <FormLabel>Offer Letter</FormLabel>
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
                        Submit
                    </Button>
                </Stack>

            </Box>
        </>
    )
}

export default UploadOfferLetter;
