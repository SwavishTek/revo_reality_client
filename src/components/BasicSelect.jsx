import React from "react";
import { Select, Text } from "@chakra-ui/react";
import { CustomText } from "../myComponent/CustomText";

const CustomSelect = ({
  options = [],
  placeholder,
  onChange,
  value,
  label,
  ...props
}) => {
  return (
    <>
      <CustomText fontWeight={"semibold"} mb={2} fontSize="1rem">
        {label}
      </CustomText>
      <Select
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </>
  );
};

export default CustomSelect;
