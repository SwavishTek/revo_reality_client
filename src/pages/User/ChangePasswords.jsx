import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Stack,
  Text,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import InputField from "../../components/InputField";
import Title from "../../components/Title";
import useCustomToast from "../../hooks/useCustomToast";
import { useFormik } from "formik";
import LoadButton from "../../components/LoadButton";
import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import MyContainer from "../../myComponent/MyContainer";

const ChangePasswords = () => {
  const { showSuccess, showError } = useCustomToast();
  const [error, setError] = useState("");
  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirm: "",
    },
    onSubmit: async (values) => {
      try {
        if (values.newPassword !== values.confirm) {
          console.log("object");
          setError("Password must be matched");
          return;
        } else {
          console.log("2");
          setError("");
        }
        const { data } = await API_AXIOS.post(Apis.changePassword, values);
        showSuccess({ message: data.message });
      } catch (er) {
        showError({
          message: er.response.data.message || "Something went wrong",
        });
      }
    },
  });

  return (
    <MyContainer
      header={'Change Password'}
      isBack
    >
      <Card p={"2rem"} mt={6}>
        <Title title="RESET YOUR PASSWORD" />
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
          gap={6}
          mt={"2rem"}
        >
          <GridItem w={"50%"}>
            <InputField
              id="password"
              label="Old Password"
              placeholder="Enter old password"
              value={values.password}
              onChange={handleChange}
            />
          </GridItem>
          <Text color={"brand.500"} fontWeight={"bold"} fontSize={"1rem"}>
            Forgot Old Password ?
          </Text>
          <GridItem w={"50%"}>
            <InputField
              id="newPassword"
              label="New Password"
              placeholder="Enter new password"
              value={values.newPassword}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem w={"50%"}>
            <InputField
              id="confirm"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={values.confirm}
              onChange={handleChange}
            />
            <Text color="red" fontSize={"12px"}>
              {error}
            </Text>
          </GridItem>
        </Grid>
        <Stack mt={6} spacing={6} direction="row" align="center">
          <LoadButton
            size="lg"
            fontSize="18px"
            colorScheme="brand"
            fontWeight="normal"
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            Save Changes
          </LoadButton>
        </Stack>
      </Card>
    </MyContainer>
    // <Box>
    //   <BackButton title={"Change Password"}></BackButton>
    //   <Card p={"2rem"} mt={6}>
    //     <Title title="RESET YOUR PASSWORD" />
    //     <Grid
    //       templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
    //       gap={6}
    //       mt={"2rem"}
    //     >
    //       <GridItem w={"50%"}>
    //         <InputField
    //           id="password"
    //           label="Old Password"
    //           placeholder="Enter old password"
    //           value={values.password}
    //           onChange={handleChange}
    //         />
    //       </GridItem>
    //       <Text color={"brand.500"} fontWeight={"bold"} fontSize={"1rem"}>
    //         Forgot Old Password ?
    //       </Text>
    //       <GridItem w={"50%"}>
    //         <InputField
    //           id="newPassword"
    //           label="New Password"
    //           placeholder="Enter new password"
    //           value={values.newPassword}
    //           onChange={handleChange}
    //         />
    //       </GridItem>
    //       <GridItem w={"50%"}>
    //         <InputField
    //           id="confirm"
    //           label="Confirm Password"
    //           placeholder="Confirm your new password"
    //           value={values.confirm}
    //           onChange={handleChange}
    //         />
    //         <Text color="red" fontSize={"12px"}>
    //           {error}
    //         </Text>
    //       </GridItem>
    //     </Grid>
    //     <Stack mt={6} spacing={6} direction="row" align="center">
    //       <LoadButton
    //         size="lg"
    //         fontSize="18px"
    //         colorScheme="brand"
    //         fontWeight="normal"
    //         isLoading={isSubmitting}
    //         onClick={handleSubmit}
    //       >
    //         Save Changes
    //       </LoadButton>
    //     </Stack>
    //   </Card>
    // </Box>
  );
};

export default ChangePasswords;
