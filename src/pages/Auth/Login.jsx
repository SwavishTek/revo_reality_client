import React from "react";
import AuthBack from "./AuthBack";
import {
  Box,
  Button,
  Input,
  //   InputGroup,
  //   InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import Apis from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../hooks/useCustomToast";
import LoadButton from "../../components/LoadButton";

const Login = () => {
  //   const [show, setShow] = React.useState(false);
  //   const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { showError, showSuccess } = useCustomToast();
  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(Apis.login, values);
        navigate({
          pathname: "/auth/verifyOTP",
          search: `email=${values.email}&pass=${values.password}`,
        });
        showSuccess({ message: data.message });
      } catch (err) {
        console.log(err.response.data.message || err);
        showError({ message: err.response.data.message || err });
      }
    },
  });

  return (
    <AuthBack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Text as="b" fontSize={"1.8rem"}>
          Login
        </Text>
        <div>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            User Name
          </Text>
          <Input value={values.email} name="email" onChange={handleChange} />
        </div>
        <div>
          {/* <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup> */}
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            Password
          </Text>
          <Input
            value={values.password}
            name="password"
            onChange={handleChange}
          />
          <Text
            color={"brand.500"}
            fontWeight={"bold"}
            fontSize={"0.8rem"}
            mt={2}
          >
            Forgot Password ?
          </Text>
        </div>
        <LoadButton
          onClick={handleSubmit}
          colorScheme="brand"
          w={"100%"}
          marginTop={"1rem"}
          isLoading={isSubmitting}
        >
          Login
        </LoadButton>
      </Box>
    </AuthBack>
  );
};

export default Login;
