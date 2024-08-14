import { Avatar, background, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { CustomText } from '../../../myComponent/CustomText'
import { BoarderBox } from '../../../myComponent/BoarderBox'
import ColumnItem from '../../../myComponent/ColumnItem'
import moment from 'moment/moment'
import { dateFormate } from '../../../utils/common'

const LeaveListItem = ({
    item,
    onClickCheckbox,
    onClickBox
}) => {
    return (
        <BoarderBox
            onClickCheckbox={onClickCheckbox}
            onClickBox={onClickBox}
            containerStyle={{
                padding: '15px',
                // marginBottom: '20px',
                // display: 'flex',
                // flexDirection: 'row',
            }}
        >
            <HStack
                width={'100%'}
                alignItems={'flex-start'}
                marginStart={'15px'}
            >
                <Avatar
                    size='sm'
                    name={item?.name || null}
                    color={'white'}
                    fontWeight={'900'}
                    marginTop={'5px'}
                />
                <Box
                    width={'100%'}
                    marginStart={'5px'}
                >
                    <HStack
                        width={'100%'}
                        alignItems={'flex-start'}
                    >

                        <ColumnItem
                            title={'Employee Name :'}
                            value={item?.name || 'N/A'}
                            width={'20%'}
                            noOfLines={2}
                        />
                        <ColumnItem
                            title={'Leave For :'}
                            value={item?.days || 'N/A'}
                            width={'20%'}
                        />
                        <ColumnItem
                            title={'Start Date :'}
                            value={dateFormate(item?.startDate)}
                            width={'20%'}
                        />
                        <ColumnItem
                            title={'End Date :'}
                            value={dateFormate(item?.endDate)}
                            width={'20%'}
                        />
                        <ColumnItem
                            title={'Pay Type :'}
                            value={item?.payType || 'N/A'}
                            width={'20%'}
                        />
                        {/* payType */}
                    </HStack>
                    <ColumnItem
                        title={'Leave For :'}
                        value={item?.reason || 'N/A'}
                        width={'100%'}
                        containerStyle={{
                            // backgroundColor: 'red',
                            marginTop: '10px'
                        }}

                    />
                </Box>
            </HStack>

        </BoarderBox>
    )
}

export default LeaveListItem