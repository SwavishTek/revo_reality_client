import React, { useState } from "react";
import AuthBack from "./AuthBack";
import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import useCustomToast from "../../hooks/useCustomToast";
import InputField from "../../components/InputField";
import LoadButton from "../../components/LoadButton";
import { resetPassword } from "../../utils/validation";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPass } from "../../useFunctions/auth/auth";
import { API_AXIOS } from "../../http/interceptor";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useCustomToast();
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  const { values, handleSubmit, handleChange, errors, isSubmitting, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: resetPassword,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          // const { data } = await API_AXIOS.post(`/auth/resetPassword/${id}`, {
          //   password: values.password,
          // });
          const { data } = await resetPass({
            id,
            password: values.password,
          });
          showSuccess({ message: data?.data?.message });
          navigate("/auth/login");
        } catch (err) {
          console.log("err", err.response?.data?.message || err);
          showError({ message: err.response?.data?.message || err.message });
        } finally {
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
        <Text as="b" fontSize={"1.8rem"}>
          Reset Password
        </Text>
        <InputField
          lableStyle={{ fontSize: "22px", fontWeight: "600" }}
          style={{ background: "#FFFFFF", color: "#898989" }}
          id="password"
          label="New Password"
          placeholder=" Enter Your New Password"
          value={values.password}
          // error={errors.newPassword}
          // touched={touched.newPassword}
          error={touched.password && errors.password}
          onChange={handleChange}
        />
        <InputField
          lableStyle={{ fontSize: "22px", fontWeight: "600" }}
          style={{ background: "#FFFFFF", color: "#898989" }}
          id="confirmPassword"
          label="Confirm Password"
          placeholder=" Enter Your Confirm Password"
          value={values.confirmPassword}
          error={touched.confirmPassword && errors.confirmPassword}
          onChange={handleChange}
        />

        <LoadButton
          colorScheme=""
          background={"#9A4D49"}
          onClick={handleSubmit}
          mt={5}
          alignContent={"center"}
          width={"100%"}
          fontSize={"20px"}
          padding={"1.5rem"}
          fontWeight={"700"}
          loading={isSubmitting}
        >
          Save
        </LoadButton>
      </Box>
    </AuthBack>
  );
};

export default ResetPassword;
