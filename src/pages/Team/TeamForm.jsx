import React from "react";
import BackButton from "../../components/BackButton";
import {
  background,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import InputField from "../../components/InputField";
import Title from "../../components/Title";
import { useFormik } from "formik";
import CustomSelect from "../../components/BasicSelect";
import LoadButton from "../../components/LoadButton";

const TeamForm = () => {
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

  return (
    <div>
      <BackButton title="Add Team" />
      <Card my={"2rem"} p={6}>
        <Box
          display="flex"
          justifyContent="center"
          marginTop={3}
          alignItems="center"
          height="100%"
        >
          <Title title="Create Team" />
        </Box>

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          gap={6}
          mt={8}
        >
          <GridItem>
            <InputField
              style={{ background: "#F9F9F9" }}
              id="name"
              label="Team Name"
              placeholder="Team Name"
              onChange={handleChange}
              value={values.name}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              style={{ background: "#F9F9F9" }}
              label={"Select Manager"}
              id={"managerRole"}
              placeholder="Select Manager"
              options={managerOption}
              onChange={handleChange}
              value={values.managerRole}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              style={{ background: "#F9F9F9" }}
              label={"Select Team Lead"}
              id={"teamRole"}
              placeholder="Select Team Lead"
              options={teamOption}
              onChange={handleChange}
              value={values.teamRole}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              style={{ background: "#F9F9F9"}}
              label={"Select Member"}
              id={"memberRole"}
              placeholder="Select Members"
              options={memberOption}
              onChange={handleChange}
              value={values.memberRole}
            />
          </GridItem>
        </Grid>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <LoadButton
           colorScheme="brand"
            onClick={handleSubmit}
            mt={8}ho
            mb={6}
            alignContent={"center"}
            width={"fit-content"}
          >
            Create Team
          </LoadButton>
        </Box>
      </Card>
    </div>
  );
};

export default TeamForm;
