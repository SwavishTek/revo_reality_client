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
      month: '',
      year: '',
      monthlyWorkingDays: '',
      yearlyWorkingDays: '',
    },
    onSubmit: async (values) => {
      console.log("Form Data:", values);

      // Construct data in the required format
      const sendData = {
        year: values.type === 'year' ? values.year : '',
        yearlyWorkingDays: values.type === 'year' ? values.yearlyWorkingDays : '',
        month: values.type === 'month' ? values.month : '',
        monthlyWorkingDays: values.type === 'month' ? values.monthlyWorkingDays : '',
        type: values.type,
        data: fileData,  // Ensure fileData is correctly formatted
      };

      try {
        const response = await uploadHoliday({ data: sendData });
        console.log('HolidayData:', response);
      } catch (error) {
        console.log('ErrorHoliday:', error);
      }
    },
  });

  console.info(fileData);
  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = excelToJson(e);
      // Ensure the data extracted from the file matches the API format
      setFileData(data); 
      // No need to set field value here since fileData is managed separately
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
                id={values.type === 'month' ? 'month' : 'year'}
                placeholder={`Select ${values.type === 'month' ? 'Month' : 'Year'}`}
                options={monthYearOptions}
                value={values.type === 'month' ? values.month : values.year}
                onChange={(e) => setFieldValue(values.type === 'month' ? 'month' : 'year', e.target.value)}
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
                id={values.type === 'month' ? 'monthlyWorkingDays' : 'yearlyWorkingDays'}
                placeholder={`Enter Working Days in ${values.type === 'month' ? 'Month' : 'Year'}`}
                {...getFieldProps(values.type === 'month' ? 'monthlyWorkingDays' : 'yearlyWorkingDays')}
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
