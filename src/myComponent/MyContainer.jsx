import { Box } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'
import { fontFamily } from '../consts/font'

export const MyContainer = ({ children }) => {
    return (
        <Box
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
        >
            <Box
                width="100%"
                flex="0 1 auto"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={'10px'}
                bg={'red'}
            >
                <CustomText
                    fontFamily={fontFamily.Oswald}
                    fontSize="30px"
                    fontWeight="300"
                >
                    Attendance
                </CustomText>
                <Box>
                    <CustomText>sdfdsf</CustomText>
                </Box>
            </Box>
            <Box
                width="100%"
                flex="1 1 auto"
                overflow="auto"
            >
                <Box
                    padding={'10px'}
                > {children}</Box>
            </Box>
        </Box>
    )
}
