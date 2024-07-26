import { Box, Text } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import React from 'react'

export default function DropDown({
    placeholder,
    containerStyle,
    width,
    label,
    options,
    isLoading,
    onInputChange,
    onMenuScrollToBottom,
    isMulti = false,
    onChange,
    getOptionValue,
    getOptionLabel,
    props
}) {
    return (
        <Box
            width={width || '100%'}
            style={containerStyle}
        >
            {label &&
                <Text
                    marginBottom={2}
                    fontWeight="500"
                    fontSize={16}
                >{label}</Text>}
            <Select
                placeholder={placeholder || label || "Search and select..."}
                options={options}
                isLoading={isLoading}
                onInputChange={onInputChange}
                onMenuScrollToBottom={onMenuScrollToBottom}
                isMulti={isMulti}
                onChange={onChange}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                useBasicStyles={true}
                chakraStyles={{
                    menuList: (provided) => ({
                        ...provided,
                        minHeight: '200px',
                    }),
                    container: (provided) => ({
                        ...provided,
                        // ...provided.container,
                        bgColor: 'rgba(249, 249, 249, 1)',
                        borderRadius: '7px',
                        border: '1px solid #ccc',
                    }),
                    control: (provided) => ({
                        ...provided,
                        boxShadow: 'none',
                        borderColor: 'transparent',
                        _focus: {
                            borderColor: 'transparent',
                            boxShadow: 'none',
                        },
                        _hover: {
                            borderColor: 'transparent',
                        },
                    }),
                    dropdownIndicator: (provided) => ({
                        ...provided,
                        color: 'gray',
                        padding: '0px',
                        'svg': {
                            width: '20px', // Adjust the thickness by changing the width and height
                            height: '20px',
                        },
                    }),
                    clearIndicator: (provided) => ({
                        ...provided,
                        color: 'gray',
                        padding: '0px',
                        'svg': {
                            width: '20px', // Adjust the thickness by changing the width and height
                            height: '20px',
                        },
                    }),
                }}
                {...props}
            />
        </Box>
    )
}
