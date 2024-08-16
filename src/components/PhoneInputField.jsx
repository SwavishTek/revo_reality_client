import { FormControl, FormLabel, Box } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputField = ({ id, label, value, onChange, width = "100%", backgroundColor = "white", ...props }) => (
  <FormControl id={id} width={width}>
    <FormLabel>{label}</FormLabel>
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      backgroundColor={backgroundColor} // Apply background color here
    >
      <PhoneInput
        country={"ae"}
        value={value}
        onChange={onChange}
        inputStyle={{
          width: "100%",
          height: "40px",
          border: "none",
          backgroundColor: "transparent", // Ensure the input background is transparent if needed
        }}
        {...props}
      />
    </Box>
  </FormControl>
);

export default PhoneInputField;
