import React from "react";
import CustomGridItem from "../../components/CustomGridItem";
import { Box, Button, Card, Grid, GridItem } from "@chakra-ui/react";
import Title from "../../components/Title";
import BackButton from "../../components/BackButton";
import { ReactComponent as TeamUpdateIcons } from "../../assets/teamUpdateIcons.svg";

const TeamDetails = () => {
  return (
    <Box>
      <BackButton title={"Team Detail"}>
        <Button  leftIcon={<TeamUpdateIcons />}  variant="solid" bg={"#fff"} color={"#898989"} _hover={"#898989"}>
          Update Team
        </Button>
      </BackButton>
      <Card p={"2rem"} mt={6} overflowY={"auto"}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="TEAM DETAILS" />
          </GridItem>
          <CustomGridItem title={"Team Name"} value={"Alpha_01"} />
          <CustomGridItem title={"Creation Date"} value={"15/5/2024"} />
          <CustomGridItem title={"Total Members"} value={"23"} />
          <CustomGridItem title={"Last Updated"} value={"26/12/2023"} />
        </Grid>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="MANAGER & TEAM LEADS LIST" />
          </GridItem>
          <CustomGridItem title={"Managers"} value={"Manager01 & Manager02"} />
          <CustomGridItem title={"Team Leads"} value={"TeamLead_01"} />
        </Grid>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="AGENTS LIST" />
          </GridItem>
          <CustomGridItem title={"agents"} value={"agent_01, agent02"} />
        </Grid>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          <GridItem colSpan={5} my={4}>
            <Title title="UPDATE DETAILS" />
          </GridItem>
          <CustomGridItem
            title={"New Added Members"}
            value={"agent_01, agent02"}
          />
          <CustomGridItem
            title={"Removed Members"}
            value={"agent_01, agent02"}
          />
        </Grid>
      </Card>
    </Box>
  );
};

export default TeamDetails;
