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
import { userRoles } from "../../utils/menuItems";
import { color } from "../../consts/color";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DropDown from "../../components/DropDown/DropDown";
import PhoneInputField from "../../components/PhoneInputField";

const LeaveForm = () => {
  const { data: auth } = useProfileQuery();
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Use useNavigate hook

  // Set state for disabling fields
  const [disabled, setDisabled] = useState(true);

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: auth?.name || "",
      lastName: auth?.lastName || "",
      role: auth?.role || "",
      mobile: auth?.mobile || "",
      reason: "",
      start: null, // Changed to null for DatePicker compatibility
      end: null, // Changed to null for DatePicker compatibility
      payType: "",
      doc: [],
    },
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values); // Log form values for debugging

        const response = await applyLeave(values);

        if (response && response.message) {
          navigate("/leaves");
          queryClient.refetchQueries(["leaves"]);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error applying leave:", err);
        // Optionally handle error, e.g., display an error message
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
    // Extract only the value from the selected option
    const value = selectedOption ? selectedOption.value : '';
    console.log(`${field}:`, value); // Log the selected value to console
    setFieldValue(field, value); // Update Formik's state with the value only
  };

  // Define options as an array of objects for the DropDown component
  const payTypeOptions = [
    { label: 'Paid', value: 'Paid' },
    { label: 'Unpaid', value: 'Unpaid' }
  ];

  return (
    <MyContainer isBack header={'Apply For Leave'}>
      <ShadowBox containerStyle={{ marginBottom: '3rem', padding: '2rem' }}>
        <MainTitle title={'PERSONAL INFORMATION'} />
        <HStack justifyContent={'space-between'} mb={6}>
          <CustomInput
            name="name" // Ensure name is used here
            label={'First Name'}
            placeholder={'Enter your first name'}
            type="text"
            containerStyle={{ width: '49%' }}
            value={values.name}
            onChange={handleChange}
            disabled={disabled} // Make this input field disabled based on state
          />
          <CustomInput
            name="lastName" // Ensure name is used here
            label={'Last Name'}
            placeholder={'Enter your last name'}
            type="text"
            containerStyle={{ width: '49%' }}
            value={values.lastName}
            onChange={handleChange}
            disabled={disabled} // Make this input field disabled based on state
          />
        </HStack>
        <HStack justifyContent={'space-between'} mb={'3rem'}>
          <DropDown
            name="role" // Ensure name is used here
            label={'Role'}
            width={'49%'}
            placeholder={'Select the Role'}
            options={userRoles}
            onChange={(selectedValue) => handleDropDownChange(selectedValue, "role")}
            value={values.role}
            disabled={disabled} // Make this dropdown disabled based on state
          />
           <PhoneInputField
              width="49%"
              backgroundColor="rgba(249, 249, 249, 1)"
               id="mobile"
               label="Phone Number"
               value={values.mobile}
               onChange={(v) => setFieldValue("mobile", v)}
               disabled={disabled} 
             />
          
        </HStack>

        <MainTitle title={'LEAVE INFORMATION'} />
        <CustomInput
          name="reason" // Ensure name is used here
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
            />
          </Box>
        </HStack>
        <HStack justifyContent={'space-between'} mb={6}>
          <DropDown
            name="payType" // Ensure name is used here
            label={'Type'}
            width={'49%'}
            placeholder={'Select Pay Type'}
            options={payTypeOptions} // Pass the array of objects
            onChange={(selectedOption) => handleDropDownChange(selectedOption, "payType")}
            value={payTypeOptions.find(option => option.value === values.payType)} // Match the value to set the selected option
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value} // Ensure getOptionValue returns the value
          />
        </HStack>
        <Box width="100%" mb={'2rem'}>
          <Text fontSize={"1rem"} fontWeight={"semibold"} mb={'0.55rem'}>
            Supported Document
          </Text>
          <CustomFileInput
            id="doc"
            name="doc" // Ensure name is used here
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
            onClick={handleSubmit} // Trigger Formik handleSubmit on button click
            isLoading={isSubmitting} // Show loading spinner if submitting
          />
        </Box>
      </ShadowBox>
    </MyContainer>
    
    /* <div>
       <BackButton title="Apply For Leave" />
       <Card my={"2rem"} p={6}>
         <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
           <GridItem colSpan={2}>
             <Title title="PERSONAL INFORMATION" />
           </GridItem>
           <GridItem colSpan={1}>
             <InputField
               id="name"
               label="Name"
               placeholder="Name"
               value={values.name}
               onChange={handleChange}
             />
           </GridItem>
 
           <GridItem colSpan={1}>
             <InputField
               id="lastName"
               label="Last Name"
               placeholder="Last Name"
               value={values.lastName}
               onChange={handleChange}
             />
           </GridItem>
 
           <GridItem colSpan={1}>
             <CustomSelect
               label={"Role"}
               id={"role"}
               placeholder="Select an option"
               options={userRoles}
               onChange={handleChange}
               value={values.role}
             />
           </GridItem>
 
           <GridItem colSpan={{ base: 1 }}>
             <PhoneInputField
               id="mobile"
               label="Phone Number"
               value={values.mobile}
               onChange={(v) => setFieldValue("mobile", v)}
             />
           </GridItem>
 
           <GridItem colSpan={2}>
             <Title title="LEAVE INFORMATION" />
           </GridItem>
 
           <GridItem colSpan={2}>
             <InputField
               id="reason"
               label="Reason For Leave"
               placeholder="Reason For Leave"
               value={values.reason}
               onChange={handleChange}
             />
           </GridItem>
 
           <GridItem colSpan={1}>
             <Text fontWeight={"semibold"} mb={1}>
               Start Date
             </Text>
             <DatePicker
               name="start"
               selected={values.start}
               onSelect={(date) => dateChange(date, "start")}
               onChange={(date) => dateChange(date, "start")}
               placeholderText="Select start date"
               minDate={new Date()}
               customInput={<Input />}
             />
           </GridItem>
           <GridItem colSpan={1}>
             <Text fontWeight={"semibold"} mb={1}>
               End Date
             </Text>
             <DatePicker
               name="end"
               selected={values.end}
               onSelect={(date) => dateChange(date, "end")}
               onChange={(date) => dateChange(date, "end")}
               placeholderText="Select end date"
               minDate={new Date()}
               customInput={<Input />}
             />
           </GridItem>
 
           <GridItem colSpan={1}>
             <CustomSelect
               label={"Type"}
               id={"payType"}
               placeholder="Select an option"
               options={leaveTypes}
               onChange={handleChange}
               value={values.payType}
             />
            ///  <InputField
               id="payType"
               label="Type"
               placeholder="Type"
               value={values.reason}
               onChange={handleChange}
             /> 
           </GridItem>
           <GridItem colSpan={2}>
            // <InputField
               id="last-name"
               label="Last Name"
               placeholder="Last Name"
             /> //
             <UploadInput
               onChange={(files) => {
                 setFieldValue("doc", files);
               }}
             />
           </GridItem>
         </Grid>
         <LoadButton
           isLoading={isSubmitting}
           onClick={handleSubmit}
           colorScheme="brand"
           mt={8}
           mb={6}
           width={"fit-content"}
         >
           Apply
         </LoadButton>
       </Card>
     </div>*/
  );
};

export default LeaveForm;
