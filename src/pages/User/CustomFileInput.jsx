import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Icon, Text, Box } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

const CustomFileInput = ({ onChange, ...props }) => {
  const [fileName, setFileName] = useState('Upload Holiday List');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Update the placeholder with the file name
      if (onChange) {
        onChange(e);
      }
    } else {
      setFileName('Upload Holiday List'); // Reset placeholder if no file
    }
  };

  return (
    <InputGroup>
      <Input
        type="file"
        display="none" // Hide the default file input
        onChange={handleFileChange}
        {...props}
      />
      <InputGroup>
        <Input
          placeholder={fileName}
          textAlign="left"
           // Add space for the icon
          cursor="pointer"
          borderRadius="md"
          _placeholder={{ color: 'gray.500' }}
          onClick={() => document.querySelector('input[type="file"]').click()} // Trigger file input click
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
    </InputGroup>
  );
};

export default CustomFileInput;
