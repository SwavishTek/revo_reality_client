import React, { useState } from "react";
import AuthBack from "./AuthBack";
import {
  Box,
  Button,
  Center,
  Flex,
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
import { API_AXIOS } from "../../http/interceptor";
import InputField from "../../components/InputField";
import { loginValidation } from "../../utils/validation";

const Login = () => {
  //   const [show, setShow] = React.useState(false);
  //   const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { showError, showSuccess } = useCustomToast();
  const { values, handleChange, handleSubmit, isSubmitting, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginValidation,
      onSubmit: async (values, { setSubmitting }) => {
        console.log("values", values);
        try {
          const { data } = await API_AXIOS.post(`auth/login`, values);
          navigate({
            pathname: "/auth/verifyOTP",
            search: `email=${values.email}&pass=${values.password}`,
          });
          showSuccess({ message: data.message });
        } catch (err) {
          console.log(
            "checking",
            err.response?.data?.message || err.toString()
          );
          showError({ message: err.response?.data?.message || err.message });
        } finally {
          setSubmitting(false);
        }
      },
    });

  const handleRedirect = () => {
    navigate("/auth/Forgot_Password");
  };

  return (
    <AuthBack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //alignItems: "center",
          width: "300px",
          gap: "1rem",
        }}
      >
        <Center as="b" fontSize={"1.8rem"}>
          Login
        </Center>
        {/* <div>
          <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
            User Name
          </Text>
          <Input value={values.email} name="email" onChange={handleChange} />
        </div> */}
        <InputField
          lableStyle={{ fontSize: "22px", fontWeight: "600" }}
          style={{ background: "#FFFFFF", color: "#898989" }}
          id="email"
          label="User Name"
          placeholder=" Enter Your Email Address"
          value={values.email}
          error={touched.email && errors.email}
          onChange={handleChange}
        />

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
        {/* <Text fontSize={"1.2rem"} fontWeight={"semibold"}>
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
            cursor={"pointer"}
            onClick={handleRedirect}
          >
            Forgot Password ?
          </Text> */}

        <InputField
          lableStyle={{ fontSize: "22px", fontWeight: "600" }}
          style={{ background: "#FFFFFF", color: "#898989" }}
          id="password"
          label="Password"
          placeholder=" Enter Your Password"
          value={values.password}
          error={touched.password && errors.password}
          onChange={handleChange}
        />

        <Text
          color={"brand.500"}
          // fontWeight={"bold"}
          justifyContent={"left"}
          fontWeight={"700"}
          fontSize={"1rem"}
          width={"50%"}
          // mt={2}
          cursor={"pointer"}
          onClick={handleRedirect}
        >
          Forgot Password ?
        </Text>
        <LoadButton
          onClick={handleSubmit}
          colorScheme=""
          fontSize={"20px"}
          background={"brand.500"}
          w={"100%"}
          marginTop={"1rem"}
          padding={"1.5rem"}
          isLoading={isSubmitting}
        >
          Login
        </LoadButton>
      </Box>
    </AuthBack>
  );
};

export default Login;
