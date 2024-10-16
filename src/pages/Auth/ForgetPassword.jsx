import React from 'react'
import { CustomInput } from '../../myComponent/CustomInput'
import { Box, Button, Text } from '@chakra-ui/react'
import AuthBack from './AuthBack'
import { CustomText } from '../../myComponent/CustomText'
import { font } from '../../consts/font'
import { CustomBtn } from '../../myComponent/CustomBtn'
import { color } from '../../consts/color'
import { useFormik } from 'formik'
import { forgotPassword } from '../../useFunctions/auth/auth'
import * as Yup from 'yup';

export const ForgetPassword = () => {
    const {
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        handleChange,
        handleBlur,
        isValid,
        resetForm
    } = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log('values', values)
            await forgotPassword({ email: values?.email });
            resetForm();
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
                    Forget Password
                </CustomText>
                <CustomText
                    fontSize='15px'
                    fontWeight='400'
                    style={{
                        textAlign: 'center',
                    }}
                    marginBottom={'30px'}
                >
                    Please enter your registered email address to reset
                    your password
                </CustomText>
                <CustomInput
                    placeholder={'Enter Your Email'}
                    width={'100%'}
                    name='email'
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    onKeyDown={handleKeyDown}
                    label={'Registered Email'}
                    labelStyle={{
                        fontSize: '23px',
                        fontWeight: '600',
                        marginBottom: '10px'
                    }}
                />
            </Box>

            <CustomBtn
                containerStyle={{
                    width: '100%',
                    padding: '10px',
                }}
                bgColor={color.secondaryBtn}
                title={'Save'}
                onClick={handleSubmit}
            />
        </AuthBack>
    )
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});
