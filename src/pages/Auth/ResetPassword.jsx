import React from 'react'
import AuthBack from './AuthBack'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { CustomText } from '../../myComponent/CustomText'
import { font } from '../../consts/font'
import { CustomInput } from '../../myComponent/CustomInput'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { resetPassword } from '../../useFunctions/auth/auth'
import { CustomBtn } from '../../myComponent/CustomBtn'
import { color } from '../../consts/color'
import { useLocation, useNavigate } from 'react-router-dom'

let textStyle = {
  fontSize: '23px',
  fontWeight: '600',
  marginBottom: '10px'
}
const ResetPassword = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const userId = searchParams.get('id');
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    isValid
  } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (value) => {
      console.log('value', value)
      if (!!userId) {
        await resetPassword({
          id: userId,
          password: values?.password
        });
        navigate('/auth/login')
      }
    }
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && isValid) {
      handleSubmit();
    }
  };

  return (
    <AuthBack>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mb={'30px'}
        width={'400px'}
      >
        <CustomText
          fontSize='30px'
          fontWeight='500'
          fontFamily={font?.Oswald}
          marginBottom={'20px'}
        >
          Reset Password
        </CustomText>
        <CustomInput
          placeholder={'Enter Your Email'}
          width={'100%'}
          name='password'
          value={values?.password}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onKeyDown={handleKeyDown}
          label={'New Password'}
          labelStyle={{ ...textStyle }}
          mb={'20px'}
        />
        <CustomInput
          placeholder={'Enter Your Email'}
          width={'100%'}
          name='confirmPassword'
          value={values?.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
          onKeyDown={handleKeyDown}
          label={'Confirm Password'}
          labelStyle={{ ...textStyle }}
          mb={'50px'}
        />

        <CustomBtn
          title={'Save'}
          onClick={handleSubmit}
          bgColor={color.secondaryBtn}
          containerStyle={{
            width: '100%',
            padding: '10px',
          }}
        />
      </Box>
    </AuthBack>
  )
}

export default ResetPassword

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});