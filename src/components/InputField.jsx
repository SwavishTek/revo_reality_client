// src/components/InputField.js
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  style,
  onChange,
}) => (
  <FormControl id={id}>
    <FormLabel>{label}</FormLabel>
    <Input sx={{...style}}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      
    />
  </FormControl>
);

export default InputField;
