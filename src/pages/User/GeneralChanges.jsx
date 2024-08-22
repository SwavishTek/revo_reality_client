import { Box, Button, Card, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import BackButton from "../../components/BackButton";
import CustomSelect from "../../components/BasicSelect";
import { monthOptions, generateYearOptions } from "../../utils/menuItems.js";
import { uploadHoliday } from "../../useFunctions/user/holidayCount.js";
import { convertExcelToJSON, excelToJson } from "../../useFunctions/commonFunctions.js";
import CustomFileInput from "./CustomFileInput.jsx";
import MyContainer from "../../myComponent/MyContainer.jsx";
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { CustomBtn } from "../../myComponent/CustomBtn.jsx";

const calculateMonthlyWorkingDays = (date) => {
  const targetMonth = dayjs(date).month(); // Get the month (0-11)
  const year = dayjs(date).year(); // Get the year

  let workingDays = 0;
  const daysInMonth = dayjs(date).daysInMonth();

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = dayjs(new Date(year, targetMonth, day));
    const dayOfWeek = currentDay.day(); // 0 for Sunday, 6 for Saturday

    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
      workingDays++;
    }
  }

  return workingDays;
};

const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        const result = jsonData.map((row) => {
          // Correctly parse the date
          const date = dayjs(row.Date).format("YYYY-MM-DD");

          return {
            name: row.Name,
            date,
            type: row.Type,
            monthlyWorkingDays: calculateMonthlyWorkingDays(date),
          };
        });

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

const GeneralChanges = () => {
  const [fileData, setFileData] = useState([]);
  const [monthYearOptions, setMonthYearOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Initialize Formik directly with useFormik
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    getFieldProps
  } = useFormik({
    initialValues: {
      type: "year",
      month: "",
      year: "",
      monthlyWorkingDays: "",
      yearlyWorkingDays: "",
      data: []
    },
    onSubmit: async (value) => {
      setIsLoading(true)
      console.log("Form Data:", value);
      try {
        await uploadHoliday({ data: value });
      } catch (error) {
        console.log("ErrorHoliday:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  console.info(fileData);
  // Handle file change
  const handleFileChange = async (file) => {
    try {
      const processedData = await parseExcelFile(file);
      setFieldValue('data', processedData)
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };
  console.log('values', values);
  // Handle type change
  useEffect(() => {
    if (values.type === "month") {
      setMonthYearOptions(monthOptions);
    } else if (values.type === "year") {
      setMonthYearOptions(generateYearOptions());
    } else {
      setMonthYearOptions([]);
    }
  }, [values.type]);

  return (
    <MyContainer header={"General Changes"} isBack>
      <Card p={"2rem"} mt={6}>
        <Stack spacing={4}>
          <Box width={{ base: "100%", md: "50%" }} mb={4}>
            <CustomSelect
              label={"Select Type"}
              id="type"
              placeholder="Select Type"
              options={[
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
              ]}
              value={values.type}
              onChange={(e) => setFieldValue("type", e.target.value)}
              width="100%"
            />
          </Box>
          {values.type && (
            <Box width={{ base: "100%", md: "50%" }} mb={4}>
              <CustomSelect
                label={values.type === "month" ? "Select Month" : "Select Year"}
                id={values.type === "month" ? "month" : "year"}
                placeholder={`Select ${values.type === "month" ? "Month" : "Year"
                  }`}
                options={monthYearOptions}
                value={values.type === "month" ? values.month : values.year}
                onChange={(e) =>
                  setFieldValue(
                    values.type === "month" ? "month" : "year",
                    e.target.value
                  )
                }
                width="100%"
              />
            </Box>
          )}
          {values.type && (
            <Box width={{ base: "100%", md: "50%" }} mb={4}>
              <Text fontSize={"1rem"} fontWeight={"semibold"} mb={"0.55rem"}>
                {values.type === "month"
                  ? "Working Days in Month"
                  : "Working Days in Year"}
              </Text>
              <Input
                id={
                  values.type === "month"
                    ? "monthlyWorkingDays"
                    : "yearlyWorkingDays"
                }
                placeholder={`Enter Working Days in ${values.type === "month" ? "Month" : "Year"
                  }`}
                {...getFieldProps(
                  values.type === "month"
                    ? "monthlyWorkingDays"
                    : "yearlyWorkingDays"
                )}
                width="100%"
              />
            </Box>
          )}
          <Box width={{ base: "100%", md: "50%" }} mb={4}>
            <Text fontSize={"1rem"} fontWeight={"semibold"} mb={"0.55rem"}>
              Upload Holiday List
            </Text>
            <CustomFileInput
              onChange={(e) => handleFileChange(e.target.files[0])}
              placeholder="Upload Holiday List"
              width="100%"
            />
          </Box>
          <Box width="100%">
            {/* <Button
              onClick={handleSubmit}
              size="lg"
              fontSize="18px"
              colorScheme="brand"
              fontWeight="normal"
            >
              Update
            </Button> */}
            <CustomBtn
              title={'Update'}
              onClick={handleSubmit}
              isLoading={isLoading}
            />
          </Box>
        </Stack>
      </Card>
    </MyContainer>
    // <Box>
    //   <BackButton title={"General Changes"} />

    //   <Card p={"2rem"} mt={6}>
    //     <Stack spacing={4}>
    //       <Box width={{ base: "100%", md: "50%" }} mb={4}>
    //         <CustomSelect
    //           label={"Select Type"}
    //           id="type"
    //           placeholder="Select Type"
    //           options={[
    //             { value: 'month', label: 'Month' },
    //             { value: 'year', label: 'Year' },
    //           ]}
    //           value={values.type}
    //           onChange={(e) => setFieldValue('type', e.target.value)}
    //           width="100%"
    //         />
    //       </Box>
    //       {values.type && (
    //         <Box width={{ base: "100%", md: "50%" }} mb={4}>
    //           <CustomSelect
    //             label={values.type === 'month' ? "Select Month" : "Select Year"}
    //             id={values.type === 'month' ? 'month' : 'year'}
    //             placeholder={`Select ${values.type === 'month' ? 'Month' : 'Year'}`}
    //             options={monthYearOptions}
    //             value={values.type === 'month' ? values.month : values.year}
    //             onChange={(e) => setFieldValue(values.type === 'month' ? 'month' : 'year', e.target.value)}
    //             width="100%"
    //           />
    //         </Box>
    //       )}
    //       {values.type && (
    //         <Box width={{ base: "100%", md: "50%" }} mb={4}>
    //           <Text fontSize={"1rem"} fontWeight={"semibold"} mb={'0.55rem'}>
    //             {values.type === 'month' ? "Working Days in Month" : "Working Days in Year"}
    //           </Text>
    //           <Input
    //             id={values.type === 'month' ? 'monthlyWorkingDays' : 'yearlyWorkingDays'}
    //             placeholder={`Enter Working Days in ${values.type === 'month' ? 'Month' : 'Year'}`}
    //             {...getFieldProps(values.type === 'month' ? 'monthlyWorkingDays' : 'yearlyWorkingDays')}
    //             width="100%"
    //           />
    //         </Box>
    //       )}
    //       <Box width={{ base: "100%", md: "50%" }} mb={4}>
    //         <Text fontSize={"1rem"} fontWeight={"semibold"} mb={'0.55rem'}>
    //           Upload Holiday List
    //         </Text>
    //         <CustomFileInput
    //           onChange={handleFileChange}
    //           placeholder="Upload Holiday List"
    //           width="100%"
    //         />
    //       </Box>
    //       <Box width="100%">
    //         <Button
    //           onClick={handleSubmit}
    //           size="lg"
    //           fontSize="18px"
    //           colorScheme="brand"
    //           fontWeight="normal"
    //         >
    //           Update
    //         </Button>
    //       </Box>
    //     </Stack>
    //   </Card>
    // </Box>
  );
};

export default GeneralChanges;
