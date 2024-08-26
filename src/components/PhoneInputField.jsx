import React from 'react';
import { FormControl, FormLabel, Box, FormErrorMessage } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from 'yup';

// Define the Yup validation schema
const phoneValidationSchema = Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be no more than 15 digits")
    .required("Phone number is required");

const PhoneInputField = ({ id, label, value, onChange, onBlur, setTouched, error, width = "100%", backgroundColor = "white", ...props }) => {
    // Validate the phone number value
    const validatePhoneNumber = (phoneNumber) => {
        try {
            phoneValidationSchema.validateSync(phoneNumber);
            return null;
        } catch (err) {
            return err.message;
        }
    };

    const validationError = validatePhoneNumber(value);

    return (
        <FormControl id={id} width={width} isInvalid={!!validationError}>
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
                    onBlur={onBlur}
                    inputStyle={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                        backgroundColor: "transparent", // Ensure the input background is transparent if needed
                    }}
                    {...props}
                />
            </Box>
            {validationError && (
                <FormErrorMessage>{validationError}</FormErrorMessage>
            )}
        </FormControl>
    );
};

export default PhoneInputField;
