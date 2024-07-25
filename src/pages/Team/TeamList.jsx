import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Filters from "../../components/Filters";
import TeamCard from "../../components/Team/TeamCard";
import { useTeamQuery } from "../../Queries/team/useTeamQuery";
import { useInView } from "react-intersection-observer";

const TeamList = () => {
  const [search, setSearch] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useTeamQuery({ search });
  const { ref, inView } = useInView();
  console.log('teamList', data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (status === "error") {
    return <Text>Error fetching data</Text>;
  }

  const allTeams = data?.pages?.flatMap((page) => page?.data || []) || [];


  return (
    <VStack spacing={4} align="stretch" height="100%" width={"100%"} p={4}>
      <Box>
        <Header title="All Team">
          <Link to={"/teams/add_team"}>
            <Button colorScheme="brand">Add Team</Button>
          </Link>
        </Header>
        <Filters onSearchChange={setSearch} />
        <Box maxHeight={"100%"} my={4} overflowY="auto" >
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
