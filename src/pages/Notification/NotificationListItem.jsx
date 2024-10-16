import React from 'react';
import { BoarderBox } from '../../myComponent/BoarderBox';
import { Box, HStack, Text } from '@chakra-ui/react';
import ColumnItem from '../../myComponent/ColumnItem';
import { CustomBtn } from '../../myComponent/CustomBtn';

const NotificationListItem = ({
    item,
    title,
    message,
    createdAt,
    onClickCheckbox,
    onClickBox
}) => {
  
  const arrData = (arr) => {
    return arr.length > 0 ? arr.map((el, i) => <Text key={i}>{el.name}</Text>) : <Text>N/A</Text>;
  };
  
    return (
        <BoarderBox
            onClickCheckbox={onClickCheckbox}
            onClickBox={onClickBox}
            containerStyle={{
                padding: '0px 10px 10px 0px',
            }}
        >
            <HStack
                width={'100%'}
                alignItems={'flex-start'}
                marginStart={'15px'}
            >
                <Box
                    width={'100%'}
                   
                >
                    <Box padding={'0px 10px 0px 0px'}>
                        <HStack
                            width={'100%'}
                            justify={'space-between'}
                            
                        >
                            <ColumnItem
                                title={item?.title || []}   
                                value={message} 
                                width={'70%'}
                            />
                            <Box
                                width={'30%'}
                                textAlign={'right'}
                            >
                                <Text fontSize={'13px'} padding={'10px 10px 0px 0px'}>
                                    {createdAt}
                                </Text>
                                <CustomBtn
                                    title={'View'}
                                    bgColor='#fff'
                                    containerStyle={{
                                        boxShadow: 'none',
                                        color: '#9A4D49',
                                        textDecoration: 'underline',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </Box>
                        </HStack>
                    </Box>
                </Box>
            </HStack>
        </BoarderBox>
    );
};

export default NotificationListItem;
