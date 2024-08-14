import { Box, Button, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Filters from "../../components/Filters";
import TeamCard from "../../components/Team/TeamCard";
import { useTeamQuery } from "./useQuery/useQuery";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";


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
  
  console.log('allTeams', allTeams)
  return (
    <MyContainer
      header={'All Team'}
      btnComponent={<>
        <CustomBtn title={'Add Team'} onClick={() => navigate('/teams/add_team')} />
      </>}
    >
    <Filters onSearchChange={setSearch} />
      <InfiniteScrollList
        data={allTeams || []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isFetching={isFetching}
        renderItem={(item) => (
          <TeamCard
            item={item}
            onClickBox={() => navigate(`/teams/${item?._id}`, { state: item })}
            onClickCheckbox={(v) => console.log('firscheckBox', v)}
          />
        )}
        loadingMessage="Loading teams..."
        errorMessage="Error fetching teams"
        noDataMessage="No Teams In The System"
      />
    </MyContainer>
    // <VStack spacing={4} align="stretch" height="100%" width={"100%"} p={4}>
    //   <Box>
    //     <Header title="All Team">
    //       <Link to={"/teams/add_team"}>
    //         <Button colorScheme="brand">Add Team</Button>
    //       </Link>
    //     </Header>
    //     <Filters onSearchChange={setSearch} />
    //     <Box maxHeight={"100%"} overflowY="auto" marginEnd={10}>
    //       <InfiniteScrollList
    //         data={allTeams || []}
    //         fetchNextPage={fetchNextPage}
    //         hasNextPage={hasNextPage}
    //         isFetchingNextPage={isFetchingNextPage}
    //         isLoading={isLoading}
    //         isFetching={isFetching}
    //         renderItem={(item) => (
    //           <TeamCard
    //             item={item}
    //             key={item?._id}
    //             onClickUpdate={() => navToUpdateTeam(item)}
    //           />
    //         )}
    //         loadingMessage="Loading teams..."
    //         errorMessage="Error fetching teams"
    //         noDataMessage="No Teams In The System"
    //       />
    //     </Box>
    //   </Box>
    // </VStack>
  );
};

export default React.memo(TeamList);
