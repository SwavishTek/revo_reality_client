import { Box, Button, Grid, GridItem, Stack, Text, Checkbox } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CardItem from "../CardItem";
import { ReactComponent as TeamUpdateIcons } from "../../assets/teamUpdateIcons.svg";
import { ReactComponent as DeleteIcons } from "../../assets/deleteIcons.svg";
import { formatDate } from "../../useFunctions/commonFunctions";

const TeamCard = ({ item, onClickUpdate, onClickDelete }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const arrData = (arr) => {
    return arr.length > 0 ? arr.map((el, i) => <Text key={i}>{el.name}</Text>) : <Text>N/A</Text>;
  };

  const cardItems = [
    { title: "Creation Date:", value: formatDate(item?.createdAt) },
    { title: "Last Update:", value: formatDate(item?.updatedAt) },
    { title: "Manager Name:", component: arrData(item?.manager) },
    { title: "Team Lead Name:", component: arrData(item?.teamLead) },
    { title: "Team Members:", component: arrData(item?.agent) },
    { title: "Total Members:", value: item?.teamMembers?.length || 0 }
  ];

  // Handle navigation
  const handleNavigation = () => {
    navigate(`/teams/${item._id}`);
  };

  return (
    <Box
      borderColor="#ADADAD"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      background="#fff"
      overflowX="auto"
      whiteSpace="nowrap"
    >
      <Grid templateColumns="repeat(7, 1fr)" gap={4} py={4} px={4}>
        <GridItem>
          <Stack direction={"row"} spacing={5}>
            <Checkbox size="md" justifyContent={"start"} mb={10} />
            
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="45px"
              height="45px"
              borderRadius="50%"
              background="#E9A80A"
              color="white"
              fontSize="24px"
              fontWeight="bold"
            >
              <Text>A</Text>
            </Box>
            <Box minWidth="120px" onClick={handleNavigation}>
              <CardItem title="Team Name:" value={item?.teamName} />
            </Box>
          </Stack>
        </GridItem>
        {cardItems.map((item, index) => (
          <GridItem key={index} onClick={handleNavigation}>
            <CardItem title={item.title} value={item.value} component={item.component} />
          </GridItem>
        ))}
      </Grid>
      <Stack direction="row" spacing={0} background="#fff">
        <Button
          leftIcon={<TeamUpdateIcons />}
          size="md"
          height="40px"
          width="200px"
          border="1px"
          bg="#F5F5F5"
          color="#000"
          borderRadius="0px"
          borderColor="#ADADAD"
          borderBottom="none"
          borderLeft="none"
          onClick={onClickUpdate}
          _hover={{ bg: "#F5F5F5", borderColor: "#ADADAD" }}
        >
          Update
        </Button>
        <Button
          leftIcon={<DeleteIcons />}
          size="md"
          height="40px"
          width="200px"
          border="1px"
          bg="#F5F5F5"
          color="#000"
          borderRadius="0px"
          borderColor="#ADADAD"
          borderLeft="none"
          borderBottom="none"
          onClick={onClickDelete}
          _hover={{ bg: "#F5F5F5", borderColor: "#ADADAD" }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default TeamCard;
