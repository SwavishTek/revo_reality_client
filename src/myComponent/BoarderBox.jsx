import { Box, Checkbox } from '@chakra-ui/react'
import React, { useState } from 'react'
import { color } from '../consts/color'
import { CustomCheckBox } from './CustomCheckBox';
import { CustomText } from './CustomText';
import { svg } from '../assets/svg';
import { CustomBtn } from './CustomBtn';


const shadow = `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`;

export const BoarderBox = ({
    children,
    containerStyle,
    onClickCheckbox,
    onClickBox,
    onClickBtn
}) => {

    const [checked, setChecked] = useState(false);

    const handleClickBox = () => {
        onClickBox && onClickBox();
    };

    return (
        <Box>
            <Box
                width={'100%'}
                borderRadius={'6px'}
                borderWidth={'0.5px'}
                borderColor={'#ADADAD'}
                bgColor={color.white}
                // shadow={shadow}
                style={containerStyle}
                onClick={handleClickBox}
                cursor={`url(${svg.cursor}) 5 5, auto`}
            >
                {!onClickCheckbox
                    ?
                    children :
                    <Box
                        bgColor={color.white}
                        display={'flex'}
                        borderRadius={'6px'}
                    >
                        {/* for check box */}
                        <Box
                        >
                            <CustomCheckBox
                                // isCheck={checked}
                                onClickCheck={(v) => onClickCheckbox(v)}
                            />
                        </Box>
                        {/* for children */}
                        <Box
                            display={'flex'}
                            width={'100%'}
                        >
                            {children}
                        </Box>
                    </Box>
                }

            </Box>
            {!!onClickBtn && <CustomBtn
                onClick={onClickBtn}
            />}
        </Box>
    )
}
