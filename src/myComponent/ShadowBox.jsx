import { Card } from '@chakra-ui/react'
import React from 'react'

export const ShadowBox = ({
    children,
    containerStyle
}) => {
    // const shadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
    // const shadow = `rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px`
    const shadow = '2.64px 2.64px 7.91px 0px #0000002E'
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
