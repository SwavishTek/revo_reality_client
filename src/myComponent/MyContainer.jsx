import { Box } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'
import { font } from '../consts/font'
import { CustomBtn } from './CustomBtn'
import { color } from '../consts/color'

export const MyContainer = ({
    children,
    header,
    btnComponent
}) => {
    return (
        <Box
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            paddingStart={'8px'}
            paddingEnd={'16px'}
            bgColor={'#F9F9F9'}
        >
            <Box
                width="100%"
                flex="0 1 auto"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={'10px'}
            >
                <CustomText
                    fontFamily={font.Oswald}
                    fontSize="30px"
                    fontWeight="500"
                >
                    {header || 'N/A'}
                </CustomText>
                <Box
                    display="flex"
                    gap="20px"
                    alignItems={'center'}
                >
                    {btnComponent}
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
