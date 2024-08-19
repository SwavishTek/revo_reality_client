// import React, { useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
// import { Box, Button } from '@chakra-ui/react';

// const CustomSignature = ({ onSave }) => {
//     const sigCanvas = useRef({});

//     const clear = () => sigCanvas.current.clear();

//     const save = () => {
//         const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
//         if (onSave) {
//             onSave(dataURL);
//         }
//     };

//     return (
//         <Box display="flex" flexDirection="column" alignItems="center">
//             <SignatureCanvas
//                 ref={sigCanvas}
//                 canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
//                 backgroundColor="white"
//                 penColor="black"
//             />
//             <Box mt={4} display="flex" gap="10px">
//                 <Button colorScheme="red" onClick={clear}>
//                     Clear
//                 </Button>
//                 <Button colorScheme="blue" onClick={save}>
//                     Save
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export default CustomSignature;

import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import SignatureCanvas from 'react-signature-canvas';
import { CustomBtn } from './CustomBtn';
import { color } from '../consts/color';

const CustomSignature = ({ onSave }) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control
    const sigCanvas = useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const handleOpen = () => {
        onOpen();
        setIsEmpty(true)
        if (sigCanvas.current) {
            sigCanvas.current.clear(); // Clear the canvas whenever the modal is opened // Reset the isEmpty state when the modal is opened
        }
    };

    const handleSave = () => {
        if (!isEmpty) {
            const img = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
            onSave(img);
            onClose(); // Close modal after saving signature
        }
    };

    const handleClear = () => {
        sigCanvas.current.clear();
    };

    const handleEnd = () => {
        // Set the isEmpty state based on whether the canvas has any content
        setIsEmpty(sigCanvas.current.isEmpty());
    };

    return (
        <>
            {/* <Button colorScheme="blue" onClick={onOpen}>
                Add Signature
            </Button> */}
            <CustomBtn
                title={'Add Signature'}
                bgColor={color.primaryBtn}
                onClick={handleOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    width="500px"
                    maxW="500px"
                    maxH="500px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"

                >
                    <ModalHeader>Add Your Signature</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SignatureCanvas
                            ref={sigCanvas}
                            canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
                            backgroundColor="#f5f5f5"
                            penColor="black"
                            onEnd={handleEnd}
                        />
                    </ModalBody>
                    <ModalFooter gap={'20px'}>
                        {/* <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button> */}
                        <CustomBtn
                            title={'Save'}
                            onClick={handleSave}
                            bgColor={color.info}
                            isDisabled={isEmpty}
                        />
                        <CustomBtn
                            title={'Clear'}
                            onClick={handleClear}
                            bgColor={color.danger}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CustomSignature;
