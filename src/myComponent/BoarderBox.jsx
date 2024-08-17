import { Box, Button, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { color } from '../consts/color';
import { CustomCheckBox } from './CustomCheckBox';
import { svg } from '../assets/svg';

const shadow = `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`;

// Reusable button component
const StyledButton = ({ icon, label, onClick }) => (
    <Button
        leftIcon={<img src={icon} />}
        size="sm"
        height="30px"
        width="145px"
        border="1px"
        bg="#F5F5F5"
        color="#000"
        borderRadius="0.5px"
        borderBottomLeftRadius='5px'
        borderColor="#ADADAD"
        borderBottom="none"
        borderLeft="none"
        onClick={onClick}
        _hover={{ bg: "#F5F5F5", borderColor: "#ADADAD" }}
    >
        {label}
    </Button>
);

export const BoarderBox = ({
    children,
    containerStyle,
    onClickCheckbox,
    onClickBox,
    onClickPending,
    onClickApprove,
    onClickReject,
    onClickEdit,
    onClickDelete,
    onClickDeactivate,
    onClickActivate,
    showPending,
    showApprove,
    showReject,
    showEdit,
    showDelete,
    showDeactivate,
    showActivate
}) => {
    const handleClickBox = () => {
        onClickBox && onClickBox();
    };

    return (
        <Box
            width="100%"
            borderRadius="6px"
            borderWidth="0.5px"
            borderColor="#ADADAD"
            bgColor={color.white}
            style={containerStyle}
            onClick={handleClickBox}
            cursor={`url(${svg.cursor}) 5 5, auto`}
        >
            <Box display="flex" flexDirection="column">
                {/* Conditional rendering for children */}
                <Box>
                    {!onClickCheckbox ? (
                        children
                    ) : (
                        <Box
                            bgColor={color.white}
                            display="flex"
                            borderRadius="6px"
                        >
                            {/* Checkbox */}
                            <Box padding="15px 0px 0px 15px">
                                <CustomCheckBox
                                    onClickCheck={(v) => onClickCheckbox(v)}
                                />
                            </Box>
                            {/* Children content */}
                            <Box display="flex" width="100%">
                                {children}
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Buttons Container */}
                <Box >
                    <Stack direction="row" spacing={0} background="#fff" borderBottomLeftRadius={'5px'} borderBottomRightRadius={'5px'}>
                        {showPending && (
                            <StyledButton
                                icon={svg.Pending}
                                label="Pending"
                                onClick={onClickPending}
                            />
                        )}
                        {showApprove && (
                            <StyledButton
                                icon={svg.Approve}
                                label="Approve"
                                onClick={onClickApprove}
                            />
                        )}
                        {showReject && (
                            <StyledButton
                                icon={svg.Reject}
                                label="Reject"
                                onClick={onClickReject}
                            />
                        )}
                        {showEdit && (
                            <StyledButton
                                icon={svg.Edit}
                                label="Edit"
                                onClick={onClickEdit}
                            />
                        )}
                        {showDelete && (
                            <StyledButton
                                icon={svg.DeleteIcons}
                                label="Delete"
                                onClick={onClickDelete}
                            />
                        )}
                        {showDeactivate && (
                            <StyledButton
                                icon={svg.Deactivate}
                                label="Deactivate"
                                onClick={onClickDeactivate}
                            />
                        )}
                        {showActivate && (
                            <StyledButton
                                icon={svg.Activate}
                                label="Activate"
                                onClick={onClickActivate}
                            />
                        )}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};
