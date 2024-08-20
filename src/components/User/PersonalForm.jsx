import React, { useEffect } from "react";
import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react";
import InputField from "../InputField";
import { Grid, GridItem } from "@chakra-ui/react";
import "./uploadbutton.css";
import { useFormik } from "formik";
import PhoneInputField from "../PhoneInputField";
import DatePicker from "react-datepicker";
import UploadInput from "../UploadInput";
import { addUser } from "../../useFunctions/user/userFunctions";
import { useSearchParams } from "react-router-dom";
import { useUserDetailsQuery } from "../../Queries/user/userUserQuery";
import CustomSelect from "../BasicSelect";
import { userRoles } from "../../utils/menuItems";
import LoadButton from "../LoadButton";
import useCustomToast from "../../hooks/useCustomToast";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { CustomInput } from "../../myComponent/CustomInput";
import { color } from "../../consts/color";
import * as Yup from "yup";
// import { useFormik } from "formik";

const PersonalForm = ({ setCurrentStep }) => {
  const { showError, showSuccess } = useCustomToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: user, refetch } = useUserDetailsQuery(id);
  const toast = useToast();
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
      lastName: "",
      role: "",
      email: "",
      mobile: "",
      // dateOfJoining: "",
      department: "",
      addressProof: [],
      package: "",
      dateOfJoining: null,
      currentAddress: {
        currentAdd: "",
        currentAdd2: "",
        currentCity: "",
        currentState: "",
        currentCountry: "",
        currentPostCode: "",
      },
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = await addUser({
          step: 1,
          basicInfo: values,
          ...(!!id && { userId: id }),
        });
        refetch();
        setSearchParams({ id: data?.data?._id });
        showSuccess({ message: data?.message });
        setCurrentStep((step) => step + 1);
      } catch (err) {
        console.log(err);
        showError({ message: err?.response?.data?.message });
      }
    },
  });

  useEffect(() => {
    if (user) {
      setFieldValue("name", user.name);
      setFieldValue("lastName", user.lastName);
      setFieldValue("role", user.role);
      setFieldValue("email", user.email);
      setFieldValue("mobile", user.mobile);
      setFieldValue(
        "dateOfJoining",
        user.dateOfJoining ? new Date(user.dateOfJoining) : ""
      );
      setFieldValue("department", user.department);
      setFieldValue("addressProof", user.addressProof);
      setFieldValue("package", user.package);
      setFieldValue(
        "currentAddress.currentAdd",
        user.currentAddress?.currentAdd
      );
      setFieldValue(
        "currentAddress.currentAdd2",
        user.currentAddress?.currentAdd2
      );
      setFieldValue(
        "currentAddress.currentCity",
        user.currentAddress?.currentCity
      );
      setFieldValue(
        "currentAddress.currentState",
        user.currentAddress?.currentState
      );
      setFieldValue(
        "currentAddress.currentCountry",
        user.currentAddress?.currentCountry
      );
      setFieldValue(
        "currentAddress.currentPostCode",
        user.currentAddress?.currentPostCode
      );
    }
  }, [user, setFieldValue]);

  return (
    <>
      <Box
        bg={"white"}
        marginBottom={"2rem"}
        p={"2.5rem"}
        border={"1px solid #DCDCDC"}
        borderRadius={"6px"}
      >
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          PERSONAL INFORMATION
        </h3>
        <hr
          style={{
            color: "#DCDCDC",
            marginTop: "6px",
            width: "88%",
            marginBottom: "1.5rem",
          }}
        ></hr>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <CustomInput
              id="name"
              label="First Name"
              placeholder="First Name"
              name={"name"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              bgColor="white"
            />
          </GridItem>
          <GridItem>
            <CustomInput
              id="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              name={"lastName"}
              value={values.lastName}
              onChange={handleChange}
              // onBlur={handleBlur}
              bgColor="white"
            />
          </GridItem>
          <GridItem>
            <CustomInput
              id="email"
              label="Email"
              placeholder="Enter Email"
              name={"email"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              bgColor="white"
            />
          </GridItem>
          <GridItem>
            {/* <PhoneInputField
              id="mobile"
              label="Phone Number"
              value={values.mobile}
              onChange={(v) => setFieldValue("mobile", v)}
            /> */}
            <CustomInput
              id="mobile"
              label="Phone Number"
              placeholder="Enter your Phone Number"
              name={"mobile"}
              value={values.mobile}
              // onChange={handleChange}
              onBlur={handleBlur}
              onChange={(v) => setFieldValue("mobile", v.target.value)}
              // errors={errors}
              // touched={touched}
              bgColor="white"
            />
            {errorText({
              errors,
              touched,
              key: "mobile",
            })}
          </GridItem>
          <GridItem>
            <CustomInput
              id="role"
              label="Role"
              placeholder="Select an option"
              options={userRoles}
              name={"role"}
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              bgColor="white"
            />
          </GridItem>
          <GridItem>
            <CustomInput
              id="department"
              label="Department"
              placeholder="Enter your department"
              name={"department"}
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              bgColor="white"
            />
          </GridItem>
          <GridItem>
            <Text fontWeight={"semibold"} mb={1}>
              Joining Date
            </Text>
            <DatePicker
              name="dateOfJoining"
              selected={values.dateOfJoining}
              onBlur={handleBlur}
              onChange={(date) => setFieldValue("dateOfJoining", date)}
              placeholderText="Select joining date"
              customInput={<Input />}
            />
            {touched.dateOfJoining && errors.dateOfJoining ? (
              <Text
                color="red"
                fontWeight={"300"}
                fontSize={"12px"}
                fontFamily="Inter"
              >
                {errors.dateOfJoining}
              </Text>
            ) : null}
          </GridItem>
          <GridItem>
            <CustomInput
              id="package"
              label="Package"
              placeholder="Enter your package"
              name={"package"}
              value={values.package}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
              bgColor="white"
            />
          </GridItem>
        </Grid>
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginTop: "3rem",
          }}
        >
          ADDRESS INFORMATION
        </h3>
        <hr style={{ color: "#DCDCDC", marginTop: "6px", width: "88%" }}></hr>

        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          style={{ marginTop: "1.5rem" }}
        >
          <Grid>
            <GridItem>
              <CustomInput
                id="currentAddress.currentAdd"
                name="currentAddress.currentAdd"
                label="House.no/Flat.no/Building Name"
                placeholder="Enter your house no."
                value={values.currentAddress?.currentAdd}
                onChange={handleChange}
                onBlur={handleBlur}
                // errors={errors}
                // touched={touched}
                bgColor="white"
              />
            </GridItem>
            {errorText({
              errors,
              touched,
              key: "currentAdd",
            })}
          </Grid>
          <Grid>
            <CustomInput
              id="currentAddress.currentAdd2"
              name="currentAddress.currentAdd2"
              label="Address Line 2"
              placeholder="Enter your address"
              value={values.currentAddress?.currentAdd2}
              onChange={handleChange}
              onBlur={handleBlur}
              // errors={errors}
              // touched={touched}
              bgColor="white"
            />
          </Grid>

          <GridItem>
            <CustomInput
              id="currentAddress.currentCity" 
              name="currentAddress.currentCity" 
              label="City"
              placeholder="Enter your City"
              value={values.currentAddress?.currentCity}
              onChange={handleChange}
              onBlur={handleBlur}
              bgColor="white"
            />
            {errorText({
              errors,
              touched,
              key: "currentCity",
            })}
          </GridItem>

          <GridItem>
            <CustomInput
              id="currentAddress.currentState"
              name="currentAddress.currentState"
              label="State"
              placeholder="Enter your State"
              value={values.currentAddress?.currentState}
              onChange={handleChange}
              onBlur={handleBlur}
              bgColor="white"
            />
            {errorText({
              errors,
              touched,
              key: "currentState",
            })}
          </GridItem>
          <GridItem>
            <CustomInput
              id="currentAddress.currentCountry"
              name="currentAddress.currentCountry"
              label="Country"
              placeholder="Enter your Country"
              value={values.currentAddress?.currentCountry}
              onChange={handleChange}
              onBlur={handleBlur}
              // errors={errors}
              // touched={touched}
              bgColor="white"
            />
            {errorText({
              errors,
              touched,
              key: "currentCountry",
            })}
          </GridItem>
          <GridItem>
            {/* <InputField
              id="currentAddress.currentPostCode"
              label="Postal Code"
              placeholder="Enter your postal code"
              value={values.currentAddress?.currentPostCode}
              onChange={handleChange}
            /> */}
            <CustomInput
              id="currentAddress.currentPostCode"
              name="currentAddress.currentPostCode"
              label="Postal Code"
              placeholder="Enter your postal code"
              value={values.currentAddress?.currentPostCode}
              onChange={handleChange}
              onBlur={handleBlur}
              // errors={errors}
              // touched={touched}
              bgColor="white"
            />
            {errorText({
              errors,
              touched,
              key: "currentPostCode",
            })}
          </GridItem>
          <GridItem colSpan={2}>
            <UploadInput
              onChange={(files) => {
                setFieldValue("addressProof", files);
              }}
            />
          </GridItem>
        </Grid>
        <Box marginTop={"2rem"}>
          <CustomBtn
            title={"Save & Next"}
            // isLoading={isSubmitting}
            onClick={handleSubmit}
            bgColor={color.secondaryBtn}
            containerStyle={{
              marginRight: "1.5rem",
            }}
          />
          <CustomBtn
            title={"Next"}
            onClick={() => {
              if (setCurrentStep) setCurrentStep((step) => step + 1);
            }}
            bgColor={color.secondaryBtn}
          />
        </Box>
      </Box>
    </>
  );
};

export default PersonalForm;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  name: Yup.string().required("Name is required"),


  dateOfJoining: Yup.date().nullable().required("Joining date is required"),

  role: Yup.string().required("Role is required"),

  department: Yup.string().required("Department is required"),

  package: Yup.string().required("Offer package is required"),

  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    // .min(10, "Phone number must be at least 10 digits")
    // .max(15, "Phone number must be no more than 15 digits")
    .required("Phone number is required"),

  currentAddress: Yup.object().shape({
    currentCity: Yup.string().required("City is required"),
    currentAdd: Yup.string().required("Address is required"),
    currentState: Yup.string().required("Enter the state"),
    currentCountry: Yup.string().required("Enter the Country"),
    currentPostCode: Yup.string().required("Enter the postal code"),
  }),
});

const errorText = ({ touched, errors, key }) => {
  return (
    <>
      {touched.currentAddress?.[key] && errors.currentAddress?.[key] ? (
        <Text color="red" fontFamily="Inter" fontWeight="300" fontSize="12px">
          {errors?.currentAddress?.[key]}
        </Text>
      ) : null}
    </>
  );
};
