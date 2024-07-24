import { Box, Button, Card, Grid, GridItem, Stack } from '@chakra-ui/react'
import React from 'react'
import BackButton from '../../components/BackButton'
import InputField from '../../components/InputField'
import CustomSelect from '../../components/BasicSelect'
import UploadInput from '../../components/UploadInput'

const GeneralChanges = () => {
    
  return (
    <Box>
    <BackButton title={"General Chnages"}>
 </BackButton>
 <Card p={"2rem"} mt={6}>
 <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={6} >
    <GridItem w={'50%'}>
    <InputField
         id="daysYear"
         label="Working Days (Year)"
         placeholder="Enter working days"
         value={""}
         style={{
          backgroundColor: '#f2f2f2'
         }}
       />
     </GridItem>
     <GridItem w={'50%'}>
    <InputField
         id="daysMonth"
         label="Working Days (Month)"
         placeholder="Enter working days"
         value={""}
       />
     </GridItem>
     <GridItem w={'50%'}>
        <CustomSelect 
            label={"Select Region"}
              id={"selectRegion"}
              placeholder="Select Region"
              options={[]}
        />
     </GridItem>
     <GridItem w={'50%'}>
     <UploadInput
              onChange={[]}
              label={"Upload Holiday List"}
            />
     </GridItem>
 </Grid>
 <Stack mt={6} spacing={6} direction="row" align="center">
     <Button
       size="lg"
       fontSize="18px"
       colorScheme="brand"
       fontWeight="normal"
     >
      Update
     </Button>
     </Stack>
 </Card>
</Box>
  )
}

export default GeneralChanges