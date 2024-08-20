import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Modal,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import DatePicker from "react-datepicker";
import CustomSelect from "../../components/BasicSelect";
import { useFormik } from "formik";
import MyContainer from "../../myComponent/MyContainer";
import { color } from "../../consts/color";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/DropDown/DropDown";
import { CustomInput } from "../../myComponent/CustomInput";
import { createOfferLetter } from "../../useFunctions/offerLetter/offerLetter";
import * as Yup from 'yup';

const OfferLetter = () => {
  const navigate = useNavigate();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  // Initialize Formik
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,    
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      dateOfJoining: null,
      role: "",
      department: "",
      offerPackage: "",
    },
    validationSchema,
    onSubmit: async (value) => {
      setIsLoadingBtn(true);
      let sendData = { ...value, role: value?.role?.value };
      try {
        await createOfferLetter({
          sendData,
        });
        // Redirect or show a success message

        navigate("/users/offerletterlist");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsLoadingBtn(false);
      }
    },
  });
  // console.log('first')
  return (
    <MyContainer
      header={"Offer Letter"}
      btnComponent={
        <>
          <CustomBtn
            title={"Employees"}
            bgColor={color.primaryBtn}
            onClick={() => navigate("/users/offerletterlist")}
          />
          <CustomBtn
            title={"Create Offer Letter"}
            bgColor={color.secondaryBtn}
            onClick={() => navigate("/users/offerletterlist")}
          />
        </>
      }
    >
      <Box
        bg={"white"}
        m={"2rem 5rem"}
        p={"2.5rem"}
        border={"1px solid #DCDCDC"}
        borderRadius={"6px"}
      >
        <Text
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"1.7rem"}
          marginBottom={"1rem"}
        >
          Offer Letter
        </Text>
        <HStack
          wrap={"wrap"}
          justifyContent={"space-between"}
          gap={"30px"}
          mb={"50px"}
        >
          <CustomInput
            label={"Candidate Name"}
            name={"name"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={"45%"}
          />
          <CustomInput
            label={"Email Address"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={"45%"}
          />
          <CustomInput
            type="date"
            label={"Joining Date"}
            name={"dateOfJoining"}
            value={values.dateOfJoining}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={"45%"}
          />

          <DropDown
            label={"Role"}
            options={[
              { label: "Manager", value: "manager" },
              { label: "Agent", value: "agent" },
              { label: "Team Lead", value: "teamLead" },
              { label: "Sub Admin", value: "sub_admin" },
            ]}
            name={"role"}
            value={values.role}
            // onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            onChange={(v) => setFieldValue("role", v)}
            width={"45%"}
          />

          <CustomInput
            label={"Department"}
            name={"department"}
            value={values.department}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={"45%"}
          />

          <CustomInput
            label={"Offer Package"}
            name={"offerPackage"}
            value={values.offerPackage}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={"45%"}
          />
        </HStack>
        <CustomBtn
          title={"Create DocUsign"}
          onClick={handleSubmit}
          isLoading={isLoadingBtn}
        />
      </Box>
    </MyContainer>
  );
};

export default OfferLetter;

const validationSchema = Yup.object({
  email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

  name: Yup.string()
      .required('Name is required'),
  
  dateOfJoining: Yup.string()
      .required('Choose date of joining'),

  role: Yup.string()
      .required('Role is required'),

  department: Yup.string()
      .required('Department is required'),

  offerPackage: Yup.string()
      .required('Offer package is rrequired')

});
