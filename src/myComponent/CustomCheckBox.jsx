import { Box, Checkbox, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CustomText } from './CustomText';
import { svg } from '../assets/svg.js'

export const CustomCheckBox = ({
    isCheck,
    onClickCheck
}) => {

    const [check, setCheck] = useState(false);
    const handleClick = (event) => {
        event.stopPropagation();
        setCheck((prev) => {
            onClickCheck(!prev);
            return !prev
        })
    };

    // useEffect(() => {
    //     setCheck(!!isCheck ? true : false);
    // }, [isCheck])
    ////////////////

    return (
        <Box
            bg={'green'}
            display={'flex'}
            width={'15px'}
            height={'15px'}
            borderRadius={'5px'}
            borderWidth={'0.5px'}
            bgColor={'#F5F5F5'}
            borderColor={'#ADADAD'}
            cursor={'pointer'}
            onClick={handleClick}
        >
            {
                check ? <Image
                    src={svg.checkIcon}
                    alt={'checkIcon'}
                    objectFit={'contain'}
                /> : null
            }

        </Box>
    )
}

