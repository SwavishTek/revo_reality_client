import React, { useMemo, useState } from "react";
import BackButton from "../../components/BackButton";
import {
  background,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import InputField from "../../components/InputField";
import Title from "../../components/Title";
import { useFormik } from "formik";
import CustomSelect from "../../components/BasicSelect";
import LoadButton from "../../components/LoadButton";
import { useGetAgent } from "./useQuery/useQuery";
import { debounce } from "lodash";
import { Select } from 'chakra-react-select';
import DropDown from "../../components/DropDown/DropDown";
import { CustomInput } from "../../components/CustomInput";

const TeamForm = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading
  } = useGetAgent({
    search: inputValue
  });

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      managerRole: "",
      teamRole: "",
      memberRole: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
    },
  });


  const managerOption = [
    {
      value: "manager1",
      label: "Manager",
    },
    {
      value: "manager2",
      label: "Manager2",
    },
  ];
  const teamOption = [
    {
      value: "teamOption1",
      label: "teamOption1",
    },
    {
      value: "teamOption2",
      label: "teamOption2",
    },
  ];
  const memberOption = [
    {
      value: "member1",
      label: "member1",
    },
    {
      value: "member2",
      label: "member2",
    },
  ];
  const options = data?.pages?.flatMap((page) => page?.data || []) || [];
  // const options = data?.pages.flatMap(page =>
  //   page?.data?.map(item => ({ label: item.name, value: item._id }))
  // ) || [];

  const debouncedHandleInputChange = useMemo(
    () => debounce((newValue) => {
      setInputValue(newValue);
    }, 1000),
    []
  );

  const handleInputChange = (newValue) => {
    debouncedHandleInputChange(newValue);
  };

  const handleMenuScrollToBottom = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  console.log('options', options)
  return (
    <div>
      <BackButton title="Add Team" />
      <Card my={"2rem"} p={10} minWidth={600} margin={'70px 70px'}>

        <Title title="Create Team" boxStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginBottom: 30
        }} />

        <HStack
          justifyContent={'space-between'}
          mb={6}
        >
          <CustomInput
            label={'Team Name'}
            width={'45%'}
          />
          <DropDown
            label={'select Team Lead'}
            options={options}
            isLoading={isLoading || isFetching}
            onInputChange={handleInputChange}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            isMulti={false}
            onChange={(e) => console.log('first', e)}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            useBasicStyles={true}
            width={'45%'}
          />
        </HStack>

        <HStack
          justifyContent={'space-between'}
          mb={5}
        >
          <DropDown
            label={'Select Manager'}
            options={options}
            isLoading={isLoading || isFetching}
            onInputChange={handleInputChange}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            isMulti={false}
            onChange={(e) => console.log('first', e)}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            useBasicStyles={true}
            width={'45%'}
          />
          <DropDown
            label={'Select Team Lead'}
            options={options}
            isLoading={isLoading || isFetching}
            onInputChange={handleInputChange}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            isMulti={false}
            onChange={(e) => console.log('first', e)}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            useBasicStyles={true}
            width={'45%'}
          />
        </HStack>

        <LoadButton
          colorScheme="brand"
          onClick={handleSubmit}
          mt={8}
          alignContent={"center"}
          width={"fit-content"}
          alignSelf={'center'}
        >
          Create Team
        </LoadButton>

      </Card>
    </div>
  );
};

export default TeamForm;
