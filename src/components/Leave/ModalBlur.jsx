import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Box,
} from '@chakra-ui/react';

const ModalBlur = ({
    isOpen,
    onClose,
    footer,
    children,
    size = 'xl',
    shadow = ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'// Default shadow value
}) => (
    <>
        <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered >
            <ModalOverlay bgColor={'rgba(255, 255, 255, 0.2)'} />
            <ModalContent
                sx={{
                    boxShadow: shadow,
                    WebkitBoxShadow: shadow, // for WebKit browsers
                    MozBoxShadow: shadow, // for Firefox,
                    borderRadius: '13px',
                    borderWidth: '1px',
                    borderColor: '#DCDCDC',
                    maxWidth: "800px",
                    minWidth:'400px'
                }}
            >
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                {footer && <ModalFooter alignItems={"center"} justifyContent={"center"} gap={4}>{footer}</ModalFooter>}
            </ModalContent>
        </Modal>
        {isOpen && (
            <Box
                position="fixed"
                top="0"
                left="0"
                width="100%"
                height="100%"
                // bg="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(3px)"
                zIndex="modal"

            />
        )}
    </>
);

export default ModalBlur;
