import { Box, Button, Grid, GridItem, HStack, Input, Modal, Stack, Text } from '@chakra-ui/react';
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
import DropDown from '../../components/DropDown/DropDown';
import { CustomInput } from '../../myComponent/CustomInput';


const OfferLetter = () => {
  const navigate = useNavigate();
  // Initialize Formik
  const { values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      email: '',
      dateOfJoining: null,
      role: '',
      department: '',
      offerPackage: ''
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
        <HStack
          wrap={'wrap'}
          justifyContent={'space-between'}
          gap={'30px'}
          mb={'50px'}
        >
          <CustomInput
            label={'Candidate Name'}
            name={'name'}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={'45%'}
          />
          <CustomInput
            label={'Email Address'}
            name={'email'}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={'45%'}
          />
          <CustomInput
            type='date'
            label={'Joining Date'}
            name={'dateOfJoining'}
            value={values.dateOfJoining}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={'45%'}
          />

          {/* <CustomInput
            label={'Role'}
            name={'role'}
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={'45%'}
          /> */}

          <DropDown
            label={'Role'}
            options={[
              { value: 'Manager', label: 'manager' },
              { value: 'Agent', label: 'agent' },
              { value: 'Team Lead', label: 'teamLead' }
            ]}
            name={'role'}
            value={values.role}
            onChange={(v) => setFieldValue('role', v)}
            width={'45%'}

          />

          <CustomInput
            label={'Department'}
            name={'department'}
            value={values.department}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={'45%'}
          />

          <CustomInput
            label={'Offer Package'}
            name={'offerPackage'}
            value={values.offerPackage}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            width={'45%'}
          />

        </HStack>
        <CustomBtn
          title={'Create DocUsign'}
          onClick={handleSubmit}
        />
      </Box>

    </MyContainer>
  );
};

export default OfferLetter;