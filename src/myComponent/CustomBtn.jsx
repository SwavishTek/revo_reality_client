import { Button } from '@chakra-ui/react'
import React from 'react'
import { font } from '../consts/font'
import { color } from '../consts/color'

export const CustomBtn = ({
    title,
    onClick,
    isLoading,
    isDisabled = false,
    containerStyle,
    bgColor = color.primaryBtn,
    textColor = color.white,
    fontSize = "16px",
    fontWeight = '400',
    padding = '5px 15px',
    borderRadius = '11px',
    fontFamily = font.inter
}) => {
    return (
        <Button
            height={'auto'}
            borderRadius={borderRadius}
            padding={padding}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fontSize={fontSize}
            color={textColor}
            style={{
                'box-shadow': 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                backgroundColor: !isDisabled ? bgColor : 'rgb(199 199 199)',
                ...containerStyle
            }}
            _active={{ transform: 'scale(0.95)' }}
            transition="transform 0.2s"
            //
            onClick={onClick}
            isLoading={isLoading}
            isDisabled={isDisabled}
            _disabled={{
                bg: 'red',
                color: 'gray.700',
                cursor: 'not-allowed',
                boxShadow: 'none',
                fontFamily,
                fontWeight,
                fontSize,
                color,
                fontFamily,
                transform: 'scale(1)'
            }}
        >
            {title || 'N/A'}
        </Button>
    )
}
