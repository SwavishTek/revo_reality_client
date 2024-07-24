import { Box, Button, Card, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import BackButton from '../../components/BackButton'
import InputField from '../../components/InputField'
import Title from '../../components/Title'

const ChangePasswords = () => {
  return (
    <Box>
         <BackButton title={"Change Password"}>
      </BackButton>
      <Card p={"2rem"} mt={6}>
      <Title title="REST YOUR PASSWORD"/>
      <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={6} mt={'2rem'}>
         <GridItem w={'50%'}>
         <InputField
              id="oldPassword"
              label="Old Password"
              placeholder="Enter old password"
              value={""}
            />
          </GridItem>
          <Text
            color={"brand.500"}
            fontWeight={"bold"}
            fontSize={"1rem"}
          >
            Forgot Old Password ?
          </Text>
          <GridItem w={'50%'}>
         <InputField
              id="newPassword"
              label="New Password"
              placeholder="Enter new password"
              value={""}
            />
          </GridItem>
          <GridItem w={'50%'}>
         <InputField
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={""}
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
            Save Changes
          </Button>
          </Stack>
      </Card>
    </Box>
  )
}

export default ChangePasswords