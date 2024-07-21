import React from "react";
import { Select, Text } from "@chakra-ui/react";

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
      <Text fontWeight={"semibold"} mb={2}>
        {label}
      </Text>
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
