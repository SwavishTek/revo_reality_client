import { Box } from '@chakra-ui/react'
import React from 'react'

export const StopPropagation = () => {
    const handleClick1 = () => {
        console.log('div1 clicked');
    };

    const handleClick2 = (event) => {
        event.stopPropagation();
        console.log('div2 clicked');
    };
    return (
        <Box width="100px" onClick={handleClick1} bg="gray.200" p={4} bgColor={'red'}>
            <Box width="50px" onClick={handleClick2} bg="blue.200" bgColor={'green'}>
                div2
            </Box>
        </Box>
    )
}
