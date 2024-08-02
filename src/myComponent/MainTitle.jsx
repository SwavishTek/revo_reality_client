import { Box } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'

export const MainTitle = () => {
    return (
        <Box>
            <CustomText
                // fontFamily="Oswald"
                fontFamily="Inter"
                fontSize="19.34px"
                fontWeight="600"
            // lineHeight="23.4px"
            // textAlign="left"
            >
                EMPLOYEE  INFORMATION
            </CustomText>
        </Box>
    )
}
