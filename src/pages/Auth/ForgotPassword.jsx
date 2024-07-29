import React, { useState } from "react";
import AuthBack from "./AuthBack";
import { Box, Text, Center } from "@chakra-ui/react";
import InputField from "../../components/InputField";
import LoadButton from "../../components/LoadButton";
import { useFormik } from "formik";
import { color } from "framer-motion";
import useCustomToast from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";
import { forgetPasssword } from "../../utils/validation";
import { forgetPass } from "../../useFunctions/auth/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useCustomToast();

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasssword,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        // const { data } = await API_AXIOS.post(`auth/forgotPassword`, values);
        const { data } = await forgetPass({ email: values.email });
        showSuccess({ message: data.message });
        navigate(`/auth/resetpassword?id=${data?._id}`);
      } catch (err) {
        console.log("err", err.response?.data?.message || err.toString());
        showError({ message: err.response?.data?.message || err.message });
      } finally {
        setLoading(false);
        setSubmitting(false);
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
          width: "300px",
          gap: "0.9rem",
        }}
      >
        <Text
          as="b"
          fontSize={"1.8rem"}
          color={"rgba(0, 0, 0, 1)"}
          lineHeight={"44px"}
        >
          Forgot Password
        </Text>
        <Center>
          <Text
            fontSize="15px"
            color="#000000"
            fontWeight="500"
            textAlign="center"
          >
            Please Enter Your registered email address to reset your password
          </Text>
        </Center>
        <InputField
          lableStyle={{ fontSize: "22px", fontWeight: "600" }}
          style={{ background: "#FFFFFF", color: "#898989" }}
          id="email"
          label="Registered Email"
          placeholder=" Enter Your Registered Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        <LoadButton
          colorScheme=""
          background={"#9A4D49"}
          onClick={handleSubmit}
          fontSize={"20px"}
          mt={5}
          alignContent={"center"}
          padding={"1.5rem"}
          width={"100%"}
          isLoading={loading}
        >
          Submit
        </LoadButton>
      </Box>
    </AuthBack>
  );
};

export default ForgotPassword;
