import { Box, Button, Grid, GridItem, Input, Modal, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import DatePicker from 'react-datepicker';
import CustomSelect from '../../components/BasicSelect';
import { useFormik } from 'formik';
import MyContainer from '../../myComponent/MyContainer';
import { color } from '../../consts/color';
import { CustomBtn } from '../../myComponent/CustomBtn';
import { useNavigate } from "react-router-dom";


const OfferLetter = () => {
  const navigate = useNavigate();
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      candname: '',
      email: '',
      dateOfJoining: null,
      role: '',
      department: '',
      package: ''
    },
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form data', values);
    }
  });
  // console.log('first')
  return (
    <MyContainer
      header={'Offer Letter'}
      btnComponent={<>
        <CustomBtn title={'Employees'}
          bgColor={color.primaryBtn}
          onClick={() => navigate('/users/offerletterlist')} />
        <CustomBtn title={'Create Offer Letter'}
          bgColor={color.secondaryBtn}
          onClick={() => navigate('/users/offerletterlist')}
        />
      </>}
    >
      <Box
        bg={"white"}
        m={"2rem 5rem"}
        p={"2.5rem"}
        border={"1px solid #DCDCDC"}
        borderRadius={"6px"}>

        <Text textAlign={'center'} fontWeight={'bold'} fontSize={'1.7rem'} marginBottom={'1rem'}>Offer Letter</Text>
        <form onSubmit={formik.handleSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <InputField
                id="candname"
                label="Candidate Name"
                placeholder="Enter candidate name"
                value={formik.values.candname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </GridItem>
            <GridItem>
              <InputField
                id="email"
                label="Email Address"
                placeholder="Enter candidate email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </GridItem>
            <GridItem>
              <Text fontWeight={"semibold"} mb={1}>
                Joining Date
              </Text>
              <DatePicker
                name="dateOfJoining"
                selected={formik.values.dateOfJoining}
                onChange={(date) => formik.setFieldValue('dateOfJoining', date)}
                placeholderText="Select date"
                customInput={<Input />}
              />
            </GridItem>
            <GridItem>
              <CustomSelect
                label={"Role"}
                id={"role"}
                placeholder="Select Role"
                options={[]} // Provide options for the select component
                value={formik.values.role}
                onChange={(value) => formik.setFieldValue('role', value)}
              />
            </GridItem>
            <GridItem>
              <InputField
                id="department"
                label="Department"
                placeholder="Enter candidate department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </GridItem>
            <GridItem>
              <InputField
                id="package"
                label="Package"
                placeholder="Enter candidate package"
                value={formik.values.package}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </GridItem>
          </Grid>
          <Stack mt={'3rem'} spacing={6} direction="row" align="center" justifyContent="center">
            <Button
              size="md"
              fontSize="18px"
              colorScheme="brand"
              fontWeight={'normal'}
              type="submit"
            >
              Create DocUsign
            </Button>
          </Stack>
        </form>
      </Box>

    </MyContainer>
  );
};

export default OfferLetter;