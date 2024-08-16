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

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useGetTeamById(id);

  useEffect(() => {
    if (data) {
      setTeam(data);
      setLoading(false);
    }
  }, [data]);

  const handleUpdateButtonClick = () => {
    if (id && team) {
      navigate('/teams/add_team', { state: { _id: id, ...team.team } });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <MyContainer
      isBack
      header={'Team Detail'}
      btnComponent={
        <>
          <CustomBtn
            title={<><img src={svg.TeamUpdateIcons} alt="Update" style={{ paddingRight: '5px' }} /> Update Team</>}
            bgColor='transparent'
            textColor="#898989"
            containerStyle={{
              border: '2px solid #898989'
            }}
            onClick={handleUpdateButtonClick}
          />
        </>
      }
    >
      <ShadowBox
        containerStyle={{ width: '96%', padding: '50px 50px', marginBottom: '50px' }}
      >
        <MainTitle title={'TEAM DETAILS'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Team Name"}
          value={data?.team?.teamName || 'N/A'}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Creation Date"}
          value={formatDate(data?.team?.createdAt)}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Last Updated"}
          value={formatDate(data?.team?.updatedAt)}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Total Members"}
          value={(data?.team?.teamMembers?.length || 0) }
        />

        <MainTitle title={'MANAGER & TEAM LEADS LIST'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Managers"}
          value={arrData(data?.managers || [])}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Team Leads"}
          value={arrData(data?.teamLeads || [])}
        />

        <MainTitle title={'AGENTS LIST'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Agents"}
          value={arrData(data?.agents || [], 'name')}
        />

        <MainTitle title={'UPDATE DETAILS'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"New Added Members"}
          value={arrData(data?.team?.newAddMembers || [])}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Removed Members"}
          value={arrData(data?.team?.removeMembers || [])}
        />
      </ShadowBox>
    </MyContainer>
  );
};

export default TeamDetails;
