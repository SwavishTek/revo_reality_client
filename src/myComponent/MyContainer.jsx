import { Box, HStack, Image } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'
import { font } from '../consts/font'
import { CustomBtn } from './CustomBtn'
import { color } from '../consts/color'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { svg } from '../assets/svg.js'

const MyContainer = ({
    children,
    header,
    btnComponent,
    childContainer,
    isBack
}) => {
    const navigate = useNavigate();
    return (
        <Box
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            paddingStart={'8px'}
            // paddingEnd={'16px'}
            bgColor={'#F9F9F9'}
            minWidth={'900px'}
        >
            <Box
                width="100%"
                flex="0 1 auto"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={'10px 25px 10px 10px'}
            >
                <HStack
                    justifyContent={'flex-start'}
                    gap={'20px'}
                >
                    {isBack && <Image
                        src={svg.backIcon}
                        alt="No Data"
                        objectFit="contain"
                        onClick={() => navigate(-1)}
                    />}
                    <CustomText
                        fontFamily={font.Oswald}
                        fontSize="30px"
                        fontWeight="500"
                    >
                        {header || 'N/A'}
                    </CustomText>
                </HStack>
                <Box
                    display="flex"
                    gap="20px"
                    alignItems={'center'}
                >
                    {btnComponent}
                </Box>
            </Box>
            <Box
                width="100%"
                flex="1 1 auto"
                overflow="auto"
            >
                <Box
                    // padding={'10px'}
                    style={{
                        marginLeft: '10px',
                        marginRight: '50px',
                        paddingTop: '10px',
                        ...childContainer
                    }}
                > {children}</Box>
            </Box>
        </Box>
    )
}

export default React.memo(MyContainer);