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
import { CustomBtn } from "../myComponent/CustomBtn";
import { color } from "../consts/color";

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
            <CustomBtn
              onClick={() => {
                if (onClose) onClose();
              }}
              title={'Cancel'}
              bgColor={color.primaryBtn}
            />
            <CustomBtn
              colorScheme={"brand"}
              onClick={() => {
                if (onSubmit) onSubmit();
              }}
              title={actionLable}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
