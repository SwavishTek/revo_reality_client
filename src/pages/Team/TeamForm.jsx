import {
  Card,
  HStack
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { debounce } from "lodash";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { CustomInput } from "../../myComponent/CustomInput";
import DropDown from "../../components/DropDown/DropDown";
import LoadButton from "../../components/LoadButton";
import Title from "../../components/Title";
import { addTeam, updateTeam } from "../../useFunctions/team/teamFunction";
import { showSuccess } from "../../utils/toastHelpers";
import { useGetAgent, useGetManager, useGetTeamLead } from "./useQuery/useQuery";

const TeamForm = () => {
  const { state: prams } = useLocation();
  const isUpdate = prams?._id;
  const [inputValue, setInputValue] = useState('');
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const {
    data: managerList,
    fetchNextPage: fetchNextPageManger,
    hasNextPage: hasNextPageManger,
    isFetching: isFetchingManger,
    isLoading: isLoadingManger
  } = useGetManager({
    search: inputValue
  });

  const {
    data: agentList,
    fetchNextPage: fetchNextPageAgent,
    hasNextPage: hasNextPageAgent,
    isFetching: isFetchingAgent,
    isLoading: isLoadingAgent
  } = useGetAgent({
    search: inputValue
  });

  const {
    data: TeamLeadList,
    fetchNextPage: fetchNextPageTeamLead,
    hasNextPage: hasNextPageTeamLead,
    isFetching: isFetchingTeamLead,
    isLoading: isLoadingTeamLead
  } = useGetTeamLead({
    search: inputValue
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit
  } = useFormik({
    initialValues: {
      name: prams?.teamName || '',
      managerIds: prams?.manager || [],
      teamLeadIds: prams?.teamLead || [],
      memberIds: prams?.agent || [],
    },
    onSubmit: async (value) => {
      try {
        setIsLoadingBtn(true)
        const { name, managerIds, memberIds, teamLeadIds } = value;
        const teamMemberIds = [...managerIds, ...memberIds, ...teamLeadIds]?.map((el) => el?._id);
        console.log('teamMemberIds', teamMemberIds)
        let sendData = {
          teamName: name,
          teamMemberIds: teamMemberIds
        }
        console.log('sendData', sendData)
        if (isUpdate) {
          const resUpdate = await updateTeam({
            data: sendData,
            id: prams?._id
          });

        } else {
          const resAdd = await addTeam({
            data: sendData
          });
        }
      }
      catch (err) {
        console.log('err', err);
      }
      finally {
        setIsLoadingBtn(false)
      }
    },
  });


  const debouncedHandleInputChange = useMemo(
    () => debounce((newValue) => {
      setInputValue(newValue);
    }, 1000),
    []
  );

  const handleInputChange = (newValue) => {
    debouncedHandleInputChange(newValue);
  };

  const handleMenuScrollToBottom = (key) => {
    // key-->'manager'|'teamLeader'|'agent'
    if (key === 'manager') {
      if (hasNextPageManger) {
        fetchNextPageManger();
      }
    } else if (key === 'teamLeader') {
      if (hasNextPageTeamLead) {
        fetchNextPageTeamLead();
      }
    } else if (key === 'agent') {
      if (hasNextPageAgent) {
        fetchNextPageAgent();
      }
    }
  };

  return (
    <div>
      <BackButton title="Add Team" />
      <Card my={"2rem"} p={10} minWidth={600} margin={'30px 70px'}>

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
            value={values.name}
            name={'name'}
            onChange={handleChange}
          />
          <DropDown
            label={'Manager'}
            options={managerList}
            onInputChange={handleInputChange}
            onMenuScrollToBottom={() => handleMenuScrollToBottom('manager')}
            value={values.managerIds}
            onChange={(e) => setFieldValue('managerIds', e)}
            isLoading={isLoadingManger || isFetchingManger}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            isMulti={true}
            width={'45%'}

          />
        </HStack>

        <HStack
          justifyContent={'space-between'}
          mb={5}
        >
          <DropDown
            label={'Select Team Lead'}
            options={TeamLeadList}
            value={values.teamLeadIds}
            onChange={(e) => setFieldValue('teamLeadIds', e)}
            onInputChange={handleInputChange}
            onMenuScrollToBottom={() => handleMenuScrollToBottom('teamLead')}
            isLoading={isLoadingTeamLead || isFetchingTeamLead}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            isMulti={true}
            width={'45%'}
          />
          <DropDown
            label={'Select Member'}
            options={agentList}
            onInputChange={handleInputChange}
            onMenuScrollToBottom={() => handleMenuScrollToBottom('agent')}
            value={values.memberIds}
            onChange={(e) => setFieldValue('memberIds', e)}
            isLoading={isLoadingAgent || isFetchingAgent}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            isMulti={true}
            width={'45%'}
          />

        </HStack>

        <LoadButton
          colorScheme="brand"
          // onClick={handleSubmit}
          onClick={() => showSuccess('team add succefully')}
          mt={8}
          alignContent={"center"}
          width={"fit-content"}
          alignSelf={'center'}
          isLoading={isLoadingBtn}
        >
          Create Team s
        </LoadButton>

      </Card>
    </div>
  );
};

export default React.memo(TeamForm);
