import React from "react";
import { Stack, FormLabel, RadioGroup, Radio } from "@chakra-ui/react";

const CustomRadio = ({ label, value, onChange, options, id, defaultValue }) => {
  return (
    <Stack spacing={1}>
      <FormLabel htmlFor="payType" sx={{ color: "#000000" }}>
        {label}
      </FormLabel>
      <RadioGroup
        id={id}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        <Stack direction="row">
          {options.map((option) => (
            <Radio key={option.value} value={option.value} colorScheme="brand">
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Stack>
  );
};

export default CustomRadio;
