import React, { useEffect } from "react";
import BackButton from "../../components/BackButton";
import {
  Button,
  Card,
  Grid,
  GridItem,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Title from "../../components/Title";
import InputField from "../../components/InputField";
import PhoneInputField from "../../components/PhoneInputField";
import UploadInput from "../../components/UploadInput";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import CustomSelect from "../../components/BasicSelect";
import { leaveTypes } from "../../utils/menuItems";
import { applyLeave } from "../../useFunctions/leave/leaveFunctions";
import { useNavigate } from "react-router-dom";
import { useProfileQuery } from "../../Queries/auth/useProfileQuery";

const LeaveForm = () => {
  const { data: auth } = useProfileQuery();
  const navigate = useNavigate();
  const toast = useToast();
  const { values, handleChange, handleSubmit, setFieldValue, setValues } =
    useFormik({
      initialValues: {
        name: auth?.name || "",
        lastName: auth?.lastName || "",
        role: auth?.role || "",
        mobile: auth?.mobile || "",
        reason: "",
        start: "",
        end: "",
        payType: "",
        doc: [],
      },
      onSubmit: async (values) => {
        try {
          const data = await applyLeave(values);
          toast({
            title: data?.message,
            status: "succcess",
            duration: 1000,
            isClosable: true,
          });
        } catch (err) {
          console.log("apply leave", err);
        }
      },
    });
  useEffect(() => {
    if (auth) {
      setValues({
        name: auth?.name || "",
        lastName: auth?.lastName || "",
        role: auth?.role || "",
        mobile: auth?.mobile || "",
        reason: "",
        start: "",
        end: "",
        payType: "",
        doc: [],
      });
    }
  }, [auth]);

  const dateChange = (date, fieldsName) => {
    setFieldValue(fieldsName, date);
  };

  return (
    <div>
      <BackButton title="Apply For Leave" />
      <Card my={"2rem"} p={6}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <GridItem colSpan={2}>
            <Title title="PERSONAL INFORMATION" />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              id="name"
              label="Name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <InputField
              id="lastName"
              label="Last Name"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <InputField
              id="role"
              label="Role"
              placeholder="Role"
              value={values.lastName}
              onChange={handleChange}
            />
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <PhoneInputField
              id="mobile"
              label="Phone Number"
              value={values.mobile}
              onChange={(v) => setFieldValue("mobile", v)}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Title title="LEAVE INFORMATION" />
          </GridItem>

          <GridItem colSpan={2}>
            <InputField
              id="reason"
              label="Reason For Leave"
              placeholder="Reason For Leave"
              value={values.reason}
              onChange={handleChange}
            />
          </GridItem>

          {/* /st */}
          <GridItem colSpan={1}>
            <Text fontWeight={"semibold"} mb={1}>
              Start Date
            </Text>
            <DatePicker
              name="start"
              selected={values.start}
              onSelect={(date) => dateChange(date, "start")}
              onChange={(date) => dateChange(date, "start")}
              placeholderText="Select start date"
              minDate={new Date()}
              customInput={<Input />}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight={"semibold"} mb={1}>
              End Date
            </Text>
            <DatePicker
              name="end"
              selected={values.end}
              onSelect={(date) => dateChange(date, "end")}
              onChange={(date) => dateChange(date, "end")}
              placeholderText="Select end date"
              minDate={new Date()}
              customInput={<Input />}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <CustomSelect
              label={"Type"}
              id={"payType"}
              placeholder="Select an option"
              options={leaveTypes}
              onChange={handleChange}
              value={values.payType}
            />
            {/* <InputField
              id="payType"
              label="Type"
              placeholder="Type"
              value={values.reason}
              onChange={handleChange}
            /> */}
          </GridItem>
          <GridItem colSpan={2}>
            {/* <InputField
              id="last-name"
              label="Last Name"
              placeholder="Last Name"
            /> */}
            <UploadInput
              onChange={(files) => {
                setFieldValue("doc", files);
              }}
            />
          </GridItem>
        </Grid>
        <Button
          onClick={handleSubmit}
          colorScheme="brand"
          mt={8}
          mb={6}
          width={"fit-content"}
        >
          Apply
        </Button>
      </Card>
    </div>
  );
};

export default LeaveForm;
