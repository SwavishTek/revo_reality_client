import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LoadButton from "./LoadButton";

export default function ConfirmationDialog({
  title = "Confirmation",
  isOpen = false,
  children,
  //   onOpen,
  onClose,
  handleUpdate,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"space-between"}>
            {title}
            <Box display={"flex"} gap={2}>
              <LoadButton
                colorScheme=""
                background="#C10404"
                onClick={handleUpdate}
              >
                Update
              </LoadButton>
              <Button colorScheme="" onClick={onClose} background={"#B0B0B0"}>
                Close
              </Button>
            </Box>
          </ModalHeader>
          <Divider />
          <ModalBody>{children}</ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
