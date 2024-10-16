import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from './CustomText'
import ImagePreview from '../components/ImagePreview'

const RowItem = ({
    title,
    value,
    img,
    containerStyle,
    noOfLines,
    component,
    mb = 5
}) => {

    const renderImages = () => {
        return img?.length > 0 ? img?.map((el) => <ImagePreview img={el} />) : <ImagePreview />;
    };

    const renderText = () => {
        return (
            <CustomText
                fontSize="15px"
                fontWeight="300"
                noOfLines={noOfLines}
                style={{ textTransform: 'capitalize' }}
            >
                {value || 'N/A'}
            </CustomText>
        );
    };

    return (
        <HStack
            marginBottom={mb}
            style={{ ...containerStyle }}
        >
            <Box
                width={'28%'}
            >
                <CustomText
                    fontSize='16px'
                    fontWeight='600'
                >{title}
                </CustomText>
            </Box>
            <Box
                width={'2%'}
            >
                <CustomText
                    fontSize='16px'
                    fontWeight='600'
                >:
                </CustomText>
            </Box>
            <Box
                width={'65%'}
            >
                {component ? (
                    component
                ) : (
                    !!img ? renderImages() : renderText()
                )}
            </Box>
        </HStack>
    )
}

export default RowItem