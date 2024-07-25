import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Filters from "../../components/Filters";
import TeamCard from "../../components/Team/TeamCard";

const TeamList = () => {
  const [search, setSearch] = useState("");

  const allTeams = [
    {
     _id: 1,
      teamName: "teamName",
      creationDate: "12/12/2024",
      lastUpdate: "4/2/2024",
      teamManager: "Manager",
      teamLeadName: "teamLeadName",
      totalTeamName: "23",
      members: "Member01",
    },
    {
    _id:2,
      teamName: "teamName",
      creationDate: "12/12/2024",
      lastUpdate: "4/2/2024",
      teamManager: "Manager",
      teamLeadName: "teamLeadName",
      totalTeamName: "27",
      members: "Member01",
    },
    
  ];

  return (
    <VStack spacing={4} align="stretch" height="100%" width={"100%"} p={4}>
      <Box>
        <Header title="All Team">
          <Link to={"/teams/add_team"}>
            <Button colorScheme="brand">Add Team</Button>
          </Link>
        </Header>
        <Filters onSearchChange={setSearch} />
        <Box  maxHeight={"100%"} my={4} overflowY="auto" >
          {allTeams.length > 0 && (
            <VStack spacing={6} align="stretch">
              {allTeams?.map((item) => (
                <TeamCard item={item} key={item?._id} />
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </VStack>
  );
};

export default TeamList;
