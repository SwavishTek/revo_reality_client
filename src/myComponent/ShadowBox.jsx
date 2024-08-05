import { Box, Card } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'

export const ShadowBox = ({
    children,
    containerStyle
}) => {
    const shadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
    return (
        <Card
            padding={'20px'}
            shadow={shadow}
            style={containerStyle}
        >
            {children}
        </Card>
    )
}
