import React from "react";
import CustomGridItem from "../../components/CustomGridItem";
import { Box, Button, Card, Grid, GridItem } from "@chakra-ui/react";
import Title from "../../components/Title";
import BackButton from "../../components/BackButton";
import { useLocation, useParams } from "react-router-dom";
import { MainTitle } from "../../myComponent/MainTitle";
import { svg } from "../../assets/svg.js"
import MyContainer from "../../myComponent/MyContainer.jsx";
import { CustomBtn } from "../../myComponent/CustomBtn.jsx";
import { color } from "../../consts/color.js";
import { ShadowBox } from "../../myComponent/ShadowBox.jsx";
import RowItem from "../../myComponent/RowItem.jsx";

const TeamDetails = () => {
  const { id } = useParams();
  console.log('id', id);

  return (
   <MyContainer
   isBack
   header={'Team Detail'}
   btnComponent={
    <>
      <CustomBtn
      title={<><img src={svg.TeamUpdateIcons} alt="Copy" style={{paddingRight:'5px'}}/> Update Team</>}
      bgColor='transparent'
      textColor="#898989"
      containerStyle={{
       border:'2px solid #898989'
      }}
       />
    </>
   }>
   <ShadowBox
        containerStyle={{ width: '96%', padding: '50px 50px', marginBottom: '50px' }}
      >
        <MainTitle title={'TEAM DETAILS'} />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Team Name"}
          value={'Alpha_01'}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Creation Date"}
          value={'15/5/2024'}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Total Members"}
          value={'23'}
        />
        <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Last Updated"}
          value={'26/12/2023'} mb={10}
        />

      <MainTitle title={'MANAGER & TEAM LEADS LIST'} />
      <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Managers"}
          value={'Manager01 & Manager02'}
        />
         <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Team Leads"}
          value={'TeamLead_01'} mb={10}
        />

         <MainTitle title={'AGENTS LIST'} />
         <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Agents"}
          value={'agent_01, agent02'} mb={10}
        />

       <MainTitle title={'UPDATE DETAILS'} />
       <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"New Added Members"}
          value={'agent_01, agent02'}
        />
         <RowItem
          containerStyle={{ alignItems: 'flex-start' }}
          title={"Removed Members"}
          value={'agent_01, agent02'}
        />
      </ShadowBox>
    
   </MyContainer>

  /*  <Box>
      <BackButton title={"Team Detail"}>
        <Button leftIcon={<><img src={svg.TeamUpdateIcons} /></>} variant="solid" bg={"#fff"} color={"#898989"} _hover={"#898989"}>
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
    </Box>*/
  );
};

export default TeamDetails;
