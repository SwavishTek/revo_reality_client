import { Avatar, HStack } from '@chakra-ui/react'
import React from 'react'
import ColumnItem from '../../myComponent/ColumnItem'
import { dateFormate } from '../../utils/common'
import { BoarderBox } from '../../myComponent/BoarderBox'

const AttListItem = ({ item, onClickCheckbox, onClickBox }) => {
    return (
        <BoarderBox
            onClickCheckbox={onClickCheckbox}
            onClickBox={onClickBox}
          
        >
            <HStack
                width={'100%'}
                alignItems={'flex-start'}
                marginLeft={5}
                padding={'15px 0px'}
            >
                <Avatar
                    size='sm'
                    name={item?.name || null}
                    color={'white'}
                    fontWeight={'900'}
                    marginTop={'5px'}
                    marginEnd={3}
                />
                <ColumnItem
                    title={'Employee Name :'}
                    value={item?.name || 'N/A'}
                    width={'20%'}
                    noOfLines={2}
                />
                <ColumnItem
                    title={'Email Address :'}
                    value={item?.days || 'N/A'}
                    width={'20%'}
                />
                <ColumnItem
                    title={'Mobile Number:'}
                    value={item?.days || 'N/A'}
                    width={'20%'}
                />
                <ColumnItem
                    title={'Role:'}
                    value={dateFormate(item?.endDate)}
                    width={'20%'}
                />
                <ColumnItem
                    title={'Joining Date:'}
                    value={item?.payType || 'N/A'}
                    width={'20%'}
                />
                {/* payType */}
            </HStack>
        </BoarderBox>
    )
}

export default AttListItem