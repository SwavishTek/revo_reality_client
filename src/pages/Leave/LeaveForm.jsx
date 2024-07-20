import React from "react";
import BackButton from "../../components/BackButton";
import { Card, Grid, GridItem } from "@chakra-ui/react";
import Title from "../../components/Title";
import InputField from "../../components/InputField";
import PhoneInputField from "../../components/PhoneInputField";

const LeaveForm = () => {
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
              id="first-name"
              label="First Name"
              placeholder="First Name"
            />
          </GridItem>

          <GridItem colSpan={1}>
            <InputField
              id="last-name"
              label="Last Name"
              placeholder="Last Name"
            />
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <PhoneInputField
              id="phone"
              label="Phone Number"
              // value={phone}
              // onChange={setPhone}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Title title="LEAVE INFORMATION" />
          </GridItem>

          <GridItem colSpan={2}>
            <InputField
              id="first-name"
              label="First Name"
              placeholder="First Name"
            />
          </GridItem>

          <GridItem colSpan={1}>
            <InputField
              id="last-name"
              label="Last Name"
              placeholder="Last Name"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <InputField
              id="first-name"
              label="First Name"
              placeholder="First Name"
            />
          </GridItem>

          <GridItem colSpan={1}>
            <InputField
              id="last-name"
              label="Last Name"
              placeholder="Last Name"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <InputField
              id="last-name"
              label="Last Name"
              placeholder="Last Name"
            />
          </GridItem>
        </Grid>
      </Card>
    </div>
  );
};

export default LeaveForm;
