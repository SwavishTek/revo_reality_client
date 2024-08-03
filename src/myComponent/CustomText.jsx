import { Text } from '@chakra-ui/react'
import React from 'react'
import { font } from '../consts/font'

export const CustomText = ({
    fontSize = '12px',
    children,
    fontWeight = '300',
    color = 'rgba(0, 0, 0, 1)',
    marginBottom,
    noOfLines,
    style,
    fontFamily,
    ...props
}) => {
    return (
        <Text
            fontFamily={fontFamily || font.inter}
            noOfLines={noOfLines}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            marginBottom={marginBottom}
            style={style}
            {...props}
        >
            {children}
        </Text>
    )
}
