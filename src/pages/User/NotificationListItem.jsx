// components/NotificationListItem.jsx
import React from 'react';
import { BoarderBox } from '../../myComponent/BoarderBox';
import { Box, HStack, Text, Link } from '@chakra-ui/react';
import ColumnItem from '../../myComponent/ColumnItem';
import { CustomBtn } from '../../myComponent/CustomBtn';

const NotificationListItem = ({
    description,
    dateTime,
    onClickCheckbox,
    onClickBox
}) => {
  return (
    <BoarderBox
      onClickCheckbox={onClickCheckbox}
      onClickBox={onClickBox}
      containerStyle={{
        padding: '15px',
      }}>
      <HStack
        width={'100%'}
        alignItems={'flex-start'}
        marginStart={'15px'}
      >
        <Box
          width={'100%'}
        >
          <Box>
            <HStack
              width={'100%'}
              justify={'space-between'}
            >
              <ColumnItem
                title={'Notification'}
                value={description}
                width={'70%'}
              />
              <Box
                width={'30%'}
                textAlign={'right'}
              >
                <Text fontSize={'13px'}>
                  {dateTime}
                </Text>
                <CustomBtn
                    title={'View'}
                    bgColor='#fff'
                    containerStyle={{
                        boxShadow:'none',
                        color:'#9A4D49',
                        textDecoration:'underline',
                        fontSize:'13px',
                        fontWeight:'bold',
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
