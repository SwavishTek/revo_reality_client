import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import Filters from "../../components/Filters";
import TeamCard from "../../components/Team/TeamCard";
import { useTeamQuery } from "./useQuery/useQuery";
import InfiniteScrollList from "../../myComponent/InfiniteScrollList";
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import NoDataFound from "../User/components/NoDataFound";
import Confirmation from '../../components/Confirmation';  
import { teamDelete } from "../../useFunctions/team/teamFunction";

const TeamList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const {
    data: allTeams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,  
  } = useTeamQuery({ search });

  const handleUpdateButtonClick = (id, data, e) => {
    e.stopPropagation();
    if (id && data) {
      navigate('/teams/add_team', { state: { _id: id, ...data } });
    } else {
      console.error('Team error');
    }
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    setSelectedTeamId(id);
    onOpen();
  };

  const deleteTeam = async () => {
    try {
      if (selectedTeamId) {
        const sendData = [selectedTeamId];
        const res = await teamDelete(sendData);
        console.log('resDeleteTeam', res);
        refetch();
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MyContainer
      header="All Team"
      btnComponent={
        <>
          <CustomBtn
            title="Add Team"
            onClick={() => navigate('/teams/add_team')}
          />
        </>
      }
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
            onClickCheckbox={(v) => console.log('first checkBox', v)}
            onClickUpdate={(e) => handleUpdateButtonClick(item._id, item, e)}
            onClickDelete={(e) => handleDeleteClick(item._id, e)}
          />
        )}
        loadingMessage="Loading teams..."
        errorMessage="Error fetching teams"
        noDataMessage={
          <NoDataFound message="No Teams In The System" name="NoTeamImage" />
        }
        gap={2}
      />
      <Confirmation
        line1="Are you sure you want to delete"
        line2="the team"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={deleteTeam}
      />
    </MyContainer>
  );
};

export default React.memo(TeamList);
