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

const PersonalForm = ({ setCurrentStep }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: user, refetch } = useUserDetailsQuery(id);
  const toast = useToast();
  const { values, handleChange, handleSubmit, setFieldValue, isSubmitting } =
    useFormik({
      initialValues: {
        name: "",
        lastName: "",
        role: "",
        email: "",
        mobile: "",
        dateOfJoining: "",
        department: "",
        addressProof: [],
        package: "",
        currentAddress: {
          currentAdd: "",
          currentAdd2: "",
          currentCity: "",
          currentState: "",
          currentCountry: "",
          currentPostCode: "",
        },
      },
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
          toast({
            title: data?.message,
            status: "success",
            isClosable: true,
            duration: 1000,
          });

          setCurrentStep(2);
        } catch (err) {
          console.log(err);
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
            <InputField
              id="name"
              label="First Name"
              placeholder="First Name"
              value={values.name}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="email"
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <PhoneInputField
              id="mobile"
              label="Phone Number"
              value={values.mobile}
              onChange={(v) => setFieldValue("mobile", v)}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              label={"Role"}
              id={"role"}
              placeholder="Select an option"
              options={userRoles}
              onChange={handleChange}
              value={values.role}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="department"
              label="Department"
              placeholder="Enter your department"
              value={values.department}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <Text fontWeight={"semibold"} mb={1}>
              Joining Date
            </Text>
            <DatePicker
              name="dateOfJoining"
              selected={values.dateOfJoining}
              onSelect={(date) => setFieldValue("dateOfJoining", date)}
              onChange={(date) => setFieldValue("dateOfJoining", date)}
              placeholderText="Select joining date"
              customInput={<Input />}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="package"
              label="Package"
              placeholder="Enter your package"
              value={values.package}
              onChange={handleChange}
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
            <InputField
              id="currentAddress.currentAdd"
              label="House.no/Flat.no/Building Name"
              placeholder="Enter your house no."
              value={values.currentAddress?.currentAdd}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <InputField
              id="currentAddress.currentAdd2"
              label="Address Line 2"
              placeholder="Enter your address"
              value={values.currentAddress?.currentAdd2}
              onChange={handleChange}
            />
          </Grid>

          <GridItem>
            <InputField
              id="currentAddress.currentCity"
              label="City"
              placeholder="Enter your City"
              value={values.currentAddress?.currentCity}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="currentAddress.currentState"
              label="State"
              placeholder="Enter your state"
              value={values.currentAddress?.currentState}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="currentAddress.currentCountry"
              label="Country"
              placeholder="Enter your Country"
              value={values.currentAddress?.currentCountry}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="currentAddress.currentPostCode"
              label="Postal Code"
              placeholder="Enter your postal code"
              value={values.currentAddress?.currentPostCode}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <UploadInput
              onChange={(files) => {
                setFieldValue("addressProof", files);
              }}
            />
          </GridItem>
        </Grid>

        <Stack mt={4} spacing={6} direction="row" align="center">
          <LoadButton
            onClick={handleSubmit}
            size="md"
            fontSize="18px"
            colorScheme="brand"
            isLoading={isSubmitting}
          >
            Save & Next
          </LoadButton>
          <Button
            size="md"
            fontSize="18px"
            colorScheme="brand"
            onClick={() => {
              if (setCurrentStep) setCurrentStep((step) => step + 1);
            }}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default PersonalForm;
