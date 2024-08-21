import React, { useEffect, useState } from "react";
import { Box, HStack, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import CustomFileInput from "../User/CustomFileInput";
import { CustomInput } from "../../myComponent/CustomInput";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { MainTitle } from "../../myComponent/MainTitle";
import { ShadowBox } from "../../myComponent/ShadowBox";
import MyContainer from "../../myComponent/MyContainer";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";
import { useQueryClient } from "@tanstack/react-query";
import { applyLeave } from "../../useFunctions/leave/leaveFunctions";
import { userRoles, userRolesObj } from "../../utils/menuItems";
import { color } from "../../consts/color";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/DropDown/DropDown";
import PhoneInputField from "../../components/PhoneInputField";

const payTypeOptions = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' }
];

const leaveTypeOption = [
  { label: 'Half Day', value: 'half' },
  { label: 'Full Day', value: 'full' }
];

const LeaveForm = () => {
  const { data: auth } = useProfileQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    isSubmitting,
  } = useFormik({
    initialValues: {
      reason: "",
      start: null,
      end: null,
      payType: "",
      type: '',
      doc: [],
    },
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values); // Log form values for debugging

        await applyLeave({
          start: values.start,
          end: values.end,
          payType: values.payType,
          type: values.type,
          reason: values.reason,
          doc: values.doc,
          name: values.name,
          lastName: values.lastName,
        });

        navigate("/leaves");
        queryClient.refetchQueries(["leaves"]);
      } catch (err) {
        console.error("Error applying leave:", err.message); // Log error message
      }
    },
  });

  useEffect(() => {
    if (auth) {
      setValues({
        name: auth?.name || "",
        lastName: auth?.lastName || "",
        role: auth?.role || "",
        mobile: auth?.mobile || "",
        reason: "",
        start: null,
        end: null,
        payType: "",
        doc: [],
      });
    }
  }, [auth]);

  const handleDateChange = (date, field) => {
    setFieldValue(field, date);
  };

  const handleDropDownChange = (selectedOption, field) => {
    const value = selectedOption ? selectedOption.value : '';
    console.log(`${field}:`, value); // Log selected value for debugging
    setFieldValue(field, value);
  };


  return (
    <MyContainer isBack header={'Apply For Leave'}>
      <ShadowBox containerStyle={{ marginBottom: '3rem', padding: '2rem' }}>
        <MainTitle title={'PERSONAL INFORMATION'} />
        <HStack justifyContent={'space-between'} mb={6}>
          <CustomInput
            name="name"
            label={'First Name'}
            placeholder={'Enter your first name'}
            type="text"
            containerStyle={{ width: '49%' }}
            value={auth?.name || ""}
            // onChange={handleChange}
            disabled={true}
          />
          <CustomInput
            name="lastName"
            label={'Last Name'}
            placeholder={'Enter your last name'}
            type="text"
            containerStyle={{ width: '49%' }}
            value={auth?.lastName || ""}
            disabled={true}
          />
        </HStack>
        <HStack justifyContent={'space-between'} mb={'3rem'}>
          {/* <DropDown
            name="role"
            label={'Role'}
            width={'49%'}
            placeholder={'Select the Role'}
            options={userRoles}
            onChange={(selectedValue) => handleDropDownChange(selectedValue, "role")}
            value={values.role}
            disabled={disabled}
          /> */}
          <CustomInput
            value={userRolesObj[auth?.role] || ""}
            label={'Role'}
            width={'49%'}
            disabled={true}
          />
          <PhoneInputField
            width="49%"
            backgroundColor="rgba(249, 249, 249, 1)"
            id="mobile"
            label="Phone Number"
            value={auth?.mobile || ""}
            
            disabled={true}
          />
        </HStack>

        <MainTitle title={'LEAVE INFORMATION'} />
        <CustomInput
          name="reason"
          label={'Reason For Leave'}
          placeholder={'Enter your reason'}
          type="text"
          containerStyle={{ marginBottom: '1.5rem' }}
          value={values.reason}
          onChange={handleChange}
        />
        <HStack justifyContent={'space-between'} mb={6}>
          <Box width="49%">
            <Text fontWeight={"semibold"} mb={1}>
              Start Date
            </Text>
            <DatePicker
              name="start"
              selected={values.start}
              onChange={(date) => handleDateChange(date, "start")}
              placeholderText="Select start date"
              minDate={new Date()}
              customInput={<Input bgColor='rgba(249, 249, 249, 1)' borderColor='#CCC' />}
            />
          </Box>
          <Box width="49%">
            <Text fontWeight={"semibold"} mb={1}>
              End Date
            </Text>
            <DatePicker
              name="end"
              selected={values.end}
              onChange={(date) => handleDateChange(date, "end")}
              placeholderText="Select end date"
              minDate={new Date()}
              customInput={<Input bgColor='rgba(249, 249, 249, 1)' borderColor='#CCC' />}
            />
          </Box>
        </HStack>
        <HStack justifyContent={'space-between'} mb={6}>
          <DropDown
            name="payType"
            label={'Type'}
            width={'49%'}
            placeholder={'Select Pay Type'}
            options={payTypeOptions}
            onChange={(selectedOption) => handleDropDownChange(selectedOption, "payType")}
            value={payTypeOptions.find(option => option.value === values.payType)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />
          <DropDown
            name="type"
            label={'Select Leave Type'}
            width={'49%'}
            placeholder={'Select Pay Type'}
            options={leaveTypeOption}
            onChange={(selectedOption) => handleDropDownChange(selectedOption, "type")}
            value={leaveTypeOption.find(option => option.value === values.type)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />
        </HStack>
        <Box width="100%" mb={'2rem'}>
          <Text fontSize={"1rem"} fontWeight={"semibold"} mb={'0.55rem'}>
            Supported Document
          </Text>
          <CustomFileInput
            id="doc"
            name="doc"
            placeholder="Upload any supported document"
            width="100%"
            containerStyle={{ background: 'rgba(249, 249, 249, 1)' }}
            onChange={(files) => setFieldValue("doc", files)}
          />
        </Box>
        <Box width="100%" mb={'2rem'}>
          <CustomBtn
            title={'Apply'}
            bgColor={color.secondaryBtn}
            onClick={handleSubmit}
            isLoading={isSubmitting}
          />
        </Box>
      </ShadowBox>
    </MyContainer>
  );
};

export default LeaveForm;
