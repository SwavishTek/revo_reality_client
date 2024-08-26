import React from 'react';
import { FormControl, FormLabel, Box, FormErrorMessage } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from 'yup';
import { CustomText } from '../myComponent/CustomText';

// Define the Yup validation schema
const phoneValidationSchema = Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be no more than 15 digits")
    .required("Phone number is required");

const PhoneInputField = ({ id, label, value, onChange, onBlur, error, touched, width = "100%", backgroundColor = "white", ...props }) => {
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
        <>
            <FormLabel>{label}</FormLabel>
            <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                backgroundColor={backgroundColor} 
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
                        backgroundColor: "transparent", 
                    }}
                    {...props}
                />
            </Box>
            {error && (
                <CustomText color='red' fontWeight='300'>{error}</CustomText>
            )}
            
        </>
    );
};

export default PhoneInputField;
