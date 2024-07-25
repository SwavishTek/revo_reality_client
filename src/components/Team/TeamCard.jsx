import { Button, Card, Grid, GridItem, Stack } from "@chakra-ui/react";
import React from "react";
import CardItem from "../CardItem";
import { Link } from "react-router-dom";
import { ReactComponent as TeamUpdateIcons } from "../../assets/teamUpdateIcons.svg";
import { ReactComponent as DeleteIcons } from "../../assets/deleteIcons.svg";

const TeamCard = ({ item }) => {
  return (
    <Card
    // avatarName={item?.teamName || ""}
    //   avatarSrc={"img"}
    >
      <Link to={`/teams/${item._id}`}>
        <Grid templateColumns="repeat(6, 1fr)" gap={6} py={4} px={4}>
          <GridItem>
            <CardItem title={"Team Name"} value={item?.teamName} />
          </GridItem>
          <GridItem>
            <CardItem title={"Creation Date:"} value={item?.creationDate} />
          </GridItem>
          <GridItem>
            <CardItem title={"Last Update:"} value={item?.lastUpdate} />
          </GridItem>
          <GridItem>
            <CardItem title={"Manager Name:"} value={item?.teamManager} />
          </GridItem>
          <GridItem>
            <CardItem title={"Team Lead Name:"} value={item?.teamLeadName} />
          </GridItem>
          <GridItem>
            <CardItem title={"Total Team Name:"} value={item?.totalTeamName} />
          </GridItem>
          <GridItem>
            <CardItem title={"Memebers:"} value={item?.members} />
          </GridItem>
        </Grid>
      </Link>
      <Stack direction="row" spacing={0}>
        <Button
          leftIcon={<TeamUpdateIcons />}
          size="md"
          height="40px"
          width="200px"
          border="1px"
          borderRadius="0 0 0 8px"
          bg={"#F5F5F5"}
          _hover={""}
          color={"#000000"}
          borderColor="#ADADAD"
        >
           Update
        </Button>
        <Button
          leftIcon={<DeleteIcons />}
          size="md"
          height="40px"
          width="200px"
          border="1px"
          bg={"#F5F5F5"}
          borderRadius={"0px"}
          _hover={""}
          color={"#000000"}
          borderColor="#ADADAD"
        >
           Delete
        </Button>
       
      </Stack>
    </Card>
  );
};

export default TeamCard;
