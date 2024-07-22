import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import InputField from "../InputField";
import { Grid, GridItem } from "@chakra-ui/react";
import "./uploadbutton.css";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";

const PersonalForm = ({ setCurrentStep }) => {
  const [fileName, setFileName] = useState("Upload Any Utility Document");
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      role: "",
      email: "",
      mobile: "",
      dateOfJoining: "",
      department: "",
      addressProof: [],
      bankStatement: [],
      package: "",
      currentAddress: {
        currentAdd: "",
        currentAdd2: "",
        currentCity: "",
        currentCountry: "",
        currentPostCode: "",
        addressProof: "",
      },
    },
    onSubmit: (values) => {
      console.log(values);
      setCurrentStep(2);
    },
  });

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
              value={values.lastName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </FormControl>
            <InputField
              id="email"
              label="Email"
              placeholder="Enter your email"
              value={values.lastName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <FormControl id="role">
              <FormLabel>Role</FormLabel>
              <Input type="text" placeholder="Enter your role" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="depart">
              <FormLabel>Department</FormLabel>
              <Input type="text" placeholder="Enter your department" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="joiningdate">
              <FormLabel>Joining Date</FormLabel>
              <Input
                placeholder="Select your joining date"
                size="md"
                type="date"
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="package">
              <FormLabel>Package</FormLabel>
              <Input placeholder="Enter your package" size="md" type="tel" />
            </FormControl>
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
        <FormControl id="house" style={{ marginTop: "2rem" }}>
          <FormLabel>House.no/Flat.no/Building Name</FormLabel>
          <Input type="text" placeholder="Enter your house no." />
        </FormControl>
        <FormControl id="address2" style={{ marginTop: "1.5rem" }}>
          <FormLabel>Address Line 2</FormLabel>
          <Input type="text" placeholder="Enter your address" />
        </FormControl>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          style={{ marginTop: "1.5rem" }}
        >
          <GridItem>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input type="text" placeholder="Enter your City" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="state">
              <FormLabel>State</FormLabel>
              <Input type="text" placeholder="Enter your state" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="country">
              <FormLabel>Country</FormLabel>
              <Input type="text" placeholder="Enter your Country" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl id="postalcode">
              <FormLabel>Postal Code</FormLabel>
              <Input type="text" placeholder="Enter your postal code" />
            </FormControl>
          </GridItem>
        </Grid>
        <FormControl
          id="addressproof"
          style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
        >
          <FormLabel>Address Proof</FormLabel>
          <div
            className="uploadcruse"
            onClick={() => document.querySelector(".input-field").click()}
          >
            <Input
              type="file"
              placeholder="Upload Any Utility Document"
              className="input-field"
              hidden
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
              }}
            />
            <AttachmentIcon />
            {fileName}
          </div>
        </FormControl>

        <Stack spacing={6} direction="row" align="center">
          <Button size="md" fontSize="18px" colorScheme="brand">
            Save
          </Button>
          <Button size="md" fontSize="18px" colorScheme="brand">
            Save & Next
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default PersonalForm;
