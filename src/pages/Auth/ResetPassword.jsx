import React from 'react'
import AuthBack from './AuthBack'
import { Box, Button, Input, Text } from '@chakra-ui/react'
const ResetPassword = () => {
  return (
    <AuthBack>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Text as="b" fontSize={"1.8rem"}>
        Reset Password
      </Text>
      <div>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
           New Password
          </Text>
          <Input  name="newpassword" placeholder='Enter Your New Password'  background={'#fff'}
            borderColor={'gray'}/>
        </div>
        <div>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Confirm Password
          </Text>
          <Input
            value={''}
            name="confirmpassword"
            placeholder='Enter Confirm Your Password'
            background={'#fff'}
            borderColor={'gray'}
          />
        </div>
        
      <Button  colorScheme="brand" w={"100%"} marginTop={"1rem"}>
        Save
      </Button>
    </Box>
  </AuthBack>
  )
}

export default ResetPassword