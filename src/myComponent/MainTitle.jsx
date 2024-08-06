import { Box } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'
import { color } from '../consts/color'

export const MainTitle = ({
    title,
    mb = 5
}) => {
    return (
        <Box
            marginBottom={mb}
        >
            <CustomText
                fontFamily="Inter"
                fontSize="20px"
                fontWeight="600"
                style={{
                    borderBottom: "0.5px solid",
                    borderBottomColor: color.spanishGrey,
                    paddingBottom: "5px"
                }}
            >
                {title || 'N/A'}
            </CustomText>
        </Box>
    )
}
