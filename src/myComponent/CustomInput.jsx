import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'

export const CustomInput = ({
    style,
    props,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    width,
    label,
    containerStyle,
    touched,
    errors,
    onBlur,
    onKeyDown,
    labelStyle,
    mb,
    bgColor = 'rgba(249, 249, 249, 1)',
}) => {
    return (
        <Box
            width={width}
            mb={mb}
            style={{ ...containerStyle }}
        >
            {label &&
                <Text
                    marginBottom={2}
                    fontWeight="500"
                    fontSize={16}
                    style={{ ...labelStyle }}
                >{label}</Text>
            }
            <Input
                name={name}
                placeholder={placeholder || label || "Type..."}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                onKeyDown={onKeyDown}
                isColorGray = {false}
                bgColor={bgColor}
                borderWidth={1}
                borderColor={'#CCCCCC'}
                _focus={{
                    borderColor: '#CCCCCC',
                    borderWidth: 1,
                    boxShadow: 'none',
                }}
                _hover={{
                }}
                style={style}
                {...props}
            />
            {touched?.[name] && errors?.[name] ? (
                <CustomText color='red' fontSize={12}>{errors[name]}</CustomText>
            ) : null}

        </Box>
    )
}
