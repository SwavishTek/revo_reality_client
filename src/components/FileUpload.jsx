// FileUpload.js
import React, { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const FileUpload = ({ label, acceptedFileTypes, onFileChange, ...props }) => {
  const inputRef = useRef(null);
  const toast = useToast();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `Please upload a file of type: ${acceptedFileTypes.join(
            ", "
          )}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        onFileChange(file);
      }
    }
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <VStack spacing={4}>
        <Input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept={acceptedFileTypes?.join(",")}
          style={{ display: "none" }}
        />
        <Button
          leftIcon={<Icon as={FaUpload} />}
          onClick={handleClick}
          {...props}
        >
          Upload File
        </Button>
      </VStack>
    </FormControl>
  );
};

export default FileUpload;
