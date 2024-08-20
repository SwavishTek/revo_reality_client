import React, { useState } from "react";
import { Box, Text, Spinner, Input, InputGroup, InputRightElement, Icon } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { uploadImg } from "../useFunctions/commonFunctions";

const UploadInput = ({ onChange, label }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('Upload Proof');

  const handleUpload = async (e) => {
    setLoading(true);
    const files = e.target.files;
    const filesArr = Array.from(files);
    try {
      const result = await uploadImg(filesArr);
      console.log(result);
      if (onChange) onChange(result.data);
      setFileName(filesArr.map(file => file.name).join(', ')); // Show selected file names
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Box position="relative">
      <Text mb={2} fontWeight="semibold">
        {label}
      </Text>
      <Input
        type="file"
        display="none"
        onChange={handleUpload}
        multiple
        accept="image/png, image/gif, image/jpeg"
      />
      <InputGroup>
        <Input
          placeholder={fileName}
          textAlign="left"
          cursor="pointer"
          borderRadius="md"
          _placeholder={{ color: 'gray.500' }}
          onClick={() => document.querySelector('input[type="file"]').click()}
          readOnly
        />
        <InputRightElement
          pointerEvents="none"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={DownloadIcon} color="gray.500" />
        </InputRightElement>
      </InputGroup>
      {loading && (
        <Box my={4} textAlign="center">
          <Spinner />
        </Box>
      )}
    </Box>
  );
};

export default UploadInput;
