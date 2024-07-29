// // src/components/InputField.js
// import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

// const InputField = ({
//   id,
//   label,
//   type = "text",
//   placeholder,
//   lableStyle,
//   value,
//   onBlur,
//   error,
//   style,
//   onChange,
// }) => (
//   <FormControl id={id}>
//     <FormLabel sx={{ color: "#000000", ...lableStyle }}>{label}</FormLabel>
//     <Input
//       sx={{ ...style }}
//       type={type}
//       placeholder={placeholder}
//       onBlur={onBlur}
//       value={value}
//       onChange={onChange}
//     />
//     {error && (
//       <Text color={"red"} fontSize={"15px"} fontWeight={"400"}>
//         {error}
//       </Text>
//     )}
//   </FormControl>
// );

// export default InputField;

// src/components/InputField.js
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  labelStyle,
  value,
  onBlur,
  error,
  style,
  onChange,
  textarea = false,
}) => (
  <FormControl id={id}>
    <FormLabel
      sx={{
        color: "rgba(0, 0, 0, 1)",
        fontSize: "22px",
        fontWeight: "500",
        ...labelStyle,
      }}
    >
      {label}
    </FormLabel>
    {textarea ? (
      <Textarea
        sx={{ ...style }}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    ) : (
      <Input
        sx={{ ...style }}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    )}
    {error && (
      <Text color="red" fontSize="15px" fontWeight="400">
        {error}
      </Text>
    )}
  </FormControl>
);

export default InputField;
