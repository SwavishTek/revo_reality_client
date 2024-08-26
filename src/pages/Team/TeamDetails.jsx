import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import MyContainer from "../../myComponent/MyContainer";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { ShadowBox } from "../../myComponent/ShadowBox";
import RowItem from "../../myComponent/RowItem";
import { svg } from "../../assets/svg.js";
import { MainTitle } from "../../myComponent/MainTitle";
import { useGetTeamById } from "./useQuery/useQuery.jsx";

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};

const arrData = (arr, key = 'name') => {
  if (!arr || arr.length === 0) return 'N/A';
  return arr.map(item => item[key] || item).join(', ');
};

const getNamesFromIds = (ids, details) => {
  if (!ids || !details) return 'N/A';
  const idToNameMap = details.reduce((map, item) => {
    map[item._id] = item.name;
    return map;
  }, {});
  return ids.map(id => idToNameMap[id] || 'N/A').join(', ');
};

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { data, isLoading, refetch } = useGetTeamById(id);

  useEffect(() => {
    if (data && data.data) {
      setLoading(false);
    }
  }, [data]);

  const handleUpdateButtonClick = () => {
    if (id && data) {
      navigate('/teams/add_team', { state: { _id: id, ...data.data } });
    }
  };

  useEffect(() => {
    // Whenever the route changes or component mounts, refetch the data.
    refetch();
  }, [id, refetch]);

  if (loading || isLoading) return <div></div>;

  const { data: teamData } = data;

  return (
    <MyContainer
      isBack
      header={'Team Detail'}
      btnComponent={
        <CustomBtn
          title={<><img src={svg.TeamUpdateIcons} alt="Update" style={{ paddingRight: '5px' }} /> Update Team</>}
          bgColor='transparent'
          textColor="#898989"
          containerStyle={{
            border: '2px solid #898989'
          }}
          onClick={handleUpdateButtonClick}
        />
      }
    >
      <ShadowBox
        containerStyle={{ width: '96%', padding: '50px 50px', marginBottom: '50px' }}
      >
        <MainTitle title={'TEAM DETAILS'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Team Name"}
          value={teamData?.teamName || 'N/A'}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Creation Date"}
          value={formatDate(teamData?.createdAt)}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Last Updated"}
          value={formatDate(teamData?.updatedAt)}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Total Members"}
          value={(teamData?.teamMembers?.length || 0)}
        />

        <MainTitle title={'MANAGER & TEAM LEADS LIST'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Managers"}
          value={arrData(teamData?.manager || [])}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Team Leads"}
          value={arrData(teamData?.teamLead || [])}
        />

        <MainTitle title={'AGENTS LIST'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Agents"}
          value={arrData(teamData?.agent || [], 'name')}
        />

        <MainTitle title={'UPDATE DETAILS'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"New Added Members"}
          value={getNamesFromIds(teamData?.newAddMembers || [], teamData?.newAddMembersDetails)}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Removed Members"}
          value={getNamesFromIds(teamData?.removeMembers || [], teamData?.removeMembersDetails)}
        />
      </ShadowBox>
    </MyContainer>
  );
};

export default TeamDetails;
