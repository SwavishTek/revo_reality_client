import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function Confirmation({
  title = "Confirmation",
  line1 = "Are you sure",
  line2 = "",
  actionLable = "Yes",
  isOpen = false,
  children,
  //   onOpen,
  onClose,
  onSubmit,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text
              fontSize={"1.8rem"}
              textAlign={"center"}
              my={4}
              fontWeight={"bold"}
            >
              {title}
            </Text>
            <Text textAlign={"center"} fontWeight={500}>
              {line1}
            </Text>
            <Text textAlign={"center"} fontWeight={500}>
              {line2}
            </Text>
            {children && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                {children}
              </div>
            )}
          </ModalBody>

          <ModalFooter alignItems={"center"} justifyContent={"center"} gap={4}>
            <Button
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme={"brand"}
              onClick={() => {
                if (onSubmit) onSubmit();
              }}
            >
              {actionLable}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
