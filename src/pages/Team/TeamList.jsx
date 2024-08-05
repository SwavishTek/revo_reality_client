import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Filters from "../../components/Filters";
import TeamCard from "../../components/Team/TeamCard";
import { useTeamQuery } from "./useQuery/useQuery";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";


const TeamList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {
    data: allTeams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useTeamQuery({ search });

  const navToUpdateTeam = (data) => {
    navigate("/teams/add_team", { state: data });
  };

  return (
    <VStack spacing={4} align="stretch" height="100%" width={"100%"} p={4}>
      <Box>
        <Header title="All Team">
          <Link to={"/teams/add_team"}>
            <Button colorScheme="brand">Add Team</Button>
          </Link>
        </Header>
        <Filters onSearchChange={setSearch} />
        <Box maxHeight={"100%"} overflowY="auto" marginEnd={10}>
          <InfiniteScrollList
            data={allTeams}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            isFetching={isFetching}
            renderItem={(item) => (
              <TeamCard
                item={item}
                key={item?._id}
                onClickUpdate={() => navToUpdateTeam(item)}
              />
            )}
            loadingMessage="Loading teams..."
            errorMessage="Error fetching teams"
            noDataMessage="No Teams In The System"
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default React.memo(TeamList);
