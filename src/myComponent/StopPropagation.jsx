import { Box } from '@chakra-ui/react'
import React from 'react'

export const StopPropagation = () => {
    const handleClickBox = () => {
        console.log('div1 clicked');
    };

    const handlePropagation = (event) => {
        event.stopPropagation();
        console.log('div2 clicked');
    };

    return (
        <Box
            width="100px"
            onClick={handleClickBox}
            bg="gray.200"
            p={4}
            bgColor={'red'}>
            <Box
                width="50px"
                onClick={handlePropagation}
                bg="blue.200"
                bgColor={'green'}>
                div2
            </Box>
        </Box>
    )
}
