import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./uploadbutton.css";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import { useUserDetailsQuery } from "../../Queries/user/userUserQuery";
import { useFormik } from "formik";
import InputField from "../InputField";
import { addUser } from "../../useFunctions/user/userFunctions";
import UploadInput from "../UploadInput";
import LoadButton from "../LoadButton";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";

const BankInformation = ({ setCurrentStep }) => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: user, refetch } = useUserDetailsQuery(id);
  const { values, handleChange, handleSubmit, setFieldValue, isSubmitting } =
    useFormik({
      initialValues: {
        nameOnBank: "",
        bankName: "",
        sortCode: "",
        accountNumber: "",
        bankStatement: [],
      },
      onSubmit: async (values) => {
        console.log(values);
        try {
          const data = await addUser({
            step: 2,
            bankDetails: values,
            ...(!!id && { userId: id }),
          });
          refetch();
          toast({
            title: data?.message,
            status: "success",
            isClosable: true,
            duration: 1000,
          });
          setCurrentStep((step) => step + 1);
        } catch (err) {
          console.log(err);
        }
      },
      if (setCurrentStep) {
        setCurrentStep((step) => step + 1);
      }
    });

  useEffect(() => {
    if (user) {
      setFieldValue("nameOnBank", user?.bankDetails?.nameOnBank);
      setFieldValue("bankName", user?.bankDetails?.bankName);
      setFieldValue("sortCode", user?.bankDetails?.sortCode);
      setFieldValue("accountNumber", user?.bankDetails?.accountNumber);
      setFieldValue("bankStatement", user?.bankStatement || []);
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
          BANK INFORMATION{" "}
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
              id="bankName"
              label="Bank Name"
              placeholder="Bank Name"
              value={values.bankName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="nameOnBank"
              label="Name On Bank Account"
              placeholder="Name On Bank Account"
              value={values.nameOnBank}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="sortCode"
              label="Sort Code"
              placeholder="Sort Code"
              value={values.sortCode}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <InputField
              id="accountNumber"
              label="Account Number"
              placeholder="Account Number"
              value={values.accountNumber}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <UploadInput
              label={"Bank Statements"}
              onChange={(files) => {
                setFieldValue("bankStatement", files);
              }}
            />
          </GridItem>
        </Grid>

        <Box marginTop={'2rem'}>
          <CustomBtn 
          title={"Previous"}
          onClick={() => {
            if (setCurrentStep) setCurrentStep((step) => step - 1);
          }}
          bgColor={color.secondaryBtn}
          containerStyle={{
            marginRight: "1.5rem",
          }}
        />
          
        <CustomBtn 
          title={'Save & Next'}
          isLoading={isSubmitting}
          onClick={() => {
            handleSubmit();
          }}
          bgColor={color.secondaryBtn}
          containerStyle={{
            marginRight:'1.5rem'
          }}
        />
        <CustomBtn 
          title={"Next"}
          onClick={() => {
            if (setCurrentStep) setCurrentStep((step) => step + 1);
          }}
          bgColor={color.secondaryBtn}
          containerStyle={{
            marginRight: "1.5rem",
          }}
        />a
        
        </Box>

       
      </Box>
    </>
  );
};

export default BankInformation;
