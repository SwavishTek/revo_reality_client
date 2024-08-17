import React from 'react';
import { BoarderBox } from '../../../myComponent/BoarderBox';
import { Avatar, Box, HStack } from '@chakra-ui/react';
import ColumnItem from '../../../myComponent/ColumnItem';
import { formatDate } from "../../../useFunctions/commonFunctions.js";

const UserListItem = ({
    item,
    onClickCheckbox,
    onClickBox,
    onClickBtn,
    onClickEdit,
    onClickDelete,
}) => {
    return (
        <BoarderBox
            onClickBtn={onClickBtn}
            onClickCheckbox={onClickCheckbox}
            onClickBox={onClickBox}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            showEdit={true} // Show the Edit button
            showDelete={true} 
           
        >
            <HStack
                width={'100%'}
                alignItems={'flex-start'}
                marginStart={'15px'}
                padding={'15px 0px'}
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
                            title={'Email Address :'}
                            value={item?.email || 'N/A'}
                            width={'20%'}
                        />
                        <ColumnItem
                            title={'Mobile Number :'}
                            value={item?.mobile || 'N/A'}
                            width={'20%'}
                        />
                        <ColumnItem
                            title={'Role :'}
                            value={item?.role || 'N/A'}
                            width={'20%'}
                        />
                        <ColumnItem
                            title={'Joining Date :'}
                            value={item.dateOfJoining ? formatDate(item.dateOfJoining) : "NA"}
                            width={'20%'}
                        />
                    </HStack>
                </Box>
            </HStack>
        </BoarderBox>
    );
}

export default UserListItem;
