// src/components/PhoneInputField.js
import { FormControl, FormLabel, Box } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputField = ({ id, label, value, onChange }) => (
  <FormControl id={id}>
    <FormLabel>{label}</FormLabel>
    <Box border="1px solid" borderColor="gray.200" borderRadius="md">
      <PhoneInput
        country={"ae"}
        value={value}
        onChange={onChange}
        containerStyle={{ width: "100%" }}
        inputStyle={{
          width: "100%",
          height: "40px",
          border: "none",
        }}
      />
    </Box>
  </FormControl>
);

export default PhoneInputField;
