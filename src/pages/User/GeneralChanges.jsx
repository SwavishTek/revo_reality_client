import { Box, Button, Card, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import BackButton from '../../components/BackButton';
import CustomSelect from '../../components/BasicSelect';
import { monthOptions, generateYearOptions } from "../../utils/menuItems.js";
import { uploadHoliday } from '../../useFunctions/user/holidayCount.js';
import { excelToJson } from '../../useFunctions/commonFunctions.js';
import CustomFileInput from './CustomFileInput.jsx';

const GeneralChanges = () => {
  const [fileData, setFileData] = useState([]);
  const [monthYearOptions, setMonthYearOptions] = useState([]);

  // Initialize Formik directly with useFormik
  const { values, handleSubmit, setFieldValue, getFieldProps } = useFormik({
    initialValues: {
      type: 'year',
      monthOrYear: '',
      workingDays: '',
    },
    onSubmit: async (values) => {
      console.log("Form Data:", values);

      const sendData = {
        type: values.type,
        monthOrYear: values.monthOrYear,
        workingDays: values.workingDays,
        holidayList: fileData,
      };

      try {
        const response = await uploadHoliday({ data: sendData });
        console.log('HolidayData:', response);
      } catch (error) {
        console.log('ErrorHoliday:', error);
      }
    },
  });

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = excelToJson(e); 
      setFileData(data); 
      setFieldValue('holidayList', data); 
    }
  };

  // Handle type change
  useEffect(() => {
    if (values.type === 'month') {
      setMonthYearOptions(monthOptions);
    } else if (values.type === 'year') {
      setMonthYearOptions(generateYearOptions());
    } else {
      setMonthYearOptions([]);
    }
  }, [values.type]);
console.log('object',getFieldProps('workingDays'));
console.log('values',values.workingDays);
  return (
    <Box>
      <BackButton title={"General Changes"} />
      
      <Card p={"2rem"} mt={6}>
        <Stack spacing={4}>
          <Box width={{ base: "100%", md: "50%" }} mb={4}>
            <CustomSelect
              label={"Select Type"}
              id="type"
              placeholder="Select Type"
              options={[
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
              ]}
              value={values.type}
              onChange={(e) => setFieldValue('type', e.target.value)}
              width="100%"
            />
          </Box>
          {values.type && (
            <Box width={{ base: "100%", md: "50%" }} mb={4}>
              <CustomSelect
                label={values.type === 'month' ? "Select Month" : "Select Year"}
                id="monthOrYear"
                placeholder={`Select ${values.type === 'month' ? 'Month' : 'Year'}`}
                options={monthYearOptions}
                value={values.monthOrYear}
                onChange={(e) => setFieldValue('monthOrYear', e.target.value)}
                width="100%"
              />
            </Box>
          )}
          {values.type && (
            <Box width={{ base: "100%", md: "50%" }} mb={4}>
              <Text fontSize={"1rem"} fontWeight={"semibold"} mb={'0.55rem'}>
                {values.type === 'month' ? "Working Days in Month" : "Working Days in Year"}
              </Text>
              <Input
                id="workingDays"
                placeholder={`Enter Working Days in ${values.type === 'month' ? 'Month' : 'Year'}`}
                {...getFieldProps('workingDays')}
                width="100%"
              />
            </Box>
          )}
          <Box width={{ base: "100%", md: "50%" }} mb={4}>
            <Text fontSize={"1rem"} fontWeight={"semibold"} mb={'0.55rem'}>
              Upload Holiday List
            </Text>
            <CustomFileInput
              onChange={handleFileChange}
              placeholder="Upload Holiday List"
              width="100%"
            />
          </Box>
          <Box width="100%">
            <Button
              onClick={handleSubmit} 
              size="lg"
              fontSize="18px"
              colorScheme="brand"
              fontWeight="normal"
            >
              Update
            </Button>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default GeneralChanges;
