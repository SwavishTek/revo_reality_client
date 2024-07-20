// src/components/InputField.js
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputField = ({ id, label, type = "text", placeholder }) => (
  <FormControl id={id}>
    <FormLabel>{label}</FormLabel>
    <Input type={type} placeholder={placeholder} />
  </FormControl>
);

export default InputField;
