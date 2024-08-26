import {
  Card,
  HStack
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { debounce } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup'; // Import Yup
import BackButton from "../../components/BackButton";
import DropDown from "../../components/DropDown/DropDown";
import LoadButton from "../../components/LoadButton";
import Title from "../../components/Title";
import { CustomInput } from "../../myComponent/CustomInput";
import { addTeam, updateTeam } from "../../useFunctions/team/teamFunction";
import { showError, showSuccess } from "../../utils/toastHelpers"; // Import the showError function
import { useGetAgent, useGetManager, useGetTeamLead } from "./useQuery/useQuery";

const TeamForm = () => {
  const queryClient = useQueryClient();
  const { state: prams } = useLocation();
  const isUpdate = !!prams?._id;
  const [inputValue, setInputValue] = useState('');
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    managerIds: [],
    teamLeadIds: [],
    memberIds: [],
  });

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

  useEffect(() => {
    if (isUpdate && prams?._id) {
      setInitialValues({
        name: prams.teamName || '',
        managerIds: prams.manager || [],
        teamLeadIds: prams.teamLead || [],
        memberIds: prams.agent || [],
      });
    }
  }, [isUpdate, prams]);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema, // Add validation schema here
    onSubmit: async (value) => {
      try {
        setIsLoadingBtn(true);
        const { name, managerIds, memberIds, teamLeadIds } = value;
        const teamMemberIds = [...managerIds, ...memberIds, ...teamLeadIds]?.map((el) => el?._id);
        let sendData = {
          teamName: name,
          teamMemberIds: teamMemberIds
        };
        if (isUpdate && prams?._id) {
          await updateTeam({
            data: sendData,
            id: prams._id
          });
          // showSuccess('Team updated successfully');
          queryClient.invalidateQueries({ queryKey: ['teams'] });
          navigate("/teams");
        } else {
          await addTeam({
            data: sendData
          });
          // showSuccess('Team created successfully');
          queryClient.invalidateQueries({ queryKey: ['teams'] });
          navigate("/teams");
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        showError('Failed to save team');
      } finally {
        setIsLoadingBtn(false);
      }
    },
  });

  console.log('errors',errors);

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
      <BackButton title={isUpdate ? "Update Team" : "Add Team"} />
      <Card my={"2rem"} p={10} minWidth={600} margin={'30px 70px'}>
        <Title title={isUpdate ? "Update Team" : "Create Team"} boxStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginBottom: 30
        }} />
        <HStack
          justifyContent={'space-between'}
          mb={6}
          alignItems={'flex-start'}
        >
          <CustomInput
            label={'Team Name'}
            width={'45%'}
            value={values.name}
            name={'name'}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
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
          error={touched?.managerIds && errors?.managerIds}
          />
          {/* {errors?.managerIds &&
            touched?.managerIds &&
            typeof errors?.managerIds === "string" && (
              <Typography sx={{ color: "#C10404", fontSize: "14px" }}>
                {errors?.managerIds}
              </Typography>
            )} */}
        </HStack>
        <HStack
          justifyContent={'space-between'}
          mb={5}
          alignItems={'flex-start'}
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
            error={touched?.teamLeadIds && errors?.teamLeadIds}
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
            error={touched?.memberIds && errors?.memberIds}
          />
        </HStack>

        <LoadButton
          colorScheme="brand"
          onClick={handleSubmit}
          mt={8}
          alignContent={"center"}
          width={"fit-content"}
          alignSelf={'center'}
          isLoading={isLoadingBtn}
          _hover={{ bg: "brand.500" }}
        >
          {isUpdate ? "Update Team" : "Create Team"}
        </LoadButton>
      </Card>
    </div>
  );
};

export default TeamForm;

const validationSchema = Yup.object({
  name: Yup.string().required("Team name is required"),
  managerIds: Yup.array().of(
    Yup.object().shape({
      _id: Yup.string().required("Manager ID is required"),
      name: Yup.string().required("Manager name is required")
    })
  ).min(1, "At least one manager is required"), 
  teamLeadIds: Yup.array().of(
    Yup.object().shape({
      _id: Yup.string().required("Team lead ID is required"),
      name: Yup.string().required("Team lead name is required")
    })
  ).min(1, "At least one team lead is required"), 
  memberIds: Yup.array().of(
    Yup.object().shape({
      _id: Yup.string().required("Member ID is required"),
      name: Yup.string().required("Member name is required")
    })
  ).min(1, "At least one team member is required"), 
});
