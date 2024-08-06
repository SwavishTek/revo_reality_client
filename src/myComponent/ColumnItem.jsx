import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'

const ColumnItem = ({
    title,
    value,
    width,
    containerStyle,
    noOfLines = 2,
}) => {
    return (
        <Box
            width={width}
            style={{ ...containerStyle }}
        >
            <CustomText
                fontWeight='500'
                fontSize='13px'
            >
                {title}
            </CustomText>
            <CustomText
                fontWeight='300'
                noOfLines={noOfLines}
                fontSize='13px'
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {value}
            </CustomText>
        </Box>
    )
}

export default ColumnItem