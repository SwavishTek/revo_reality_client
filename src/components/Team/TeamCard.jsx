import { Box, Button, Card, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import CardItem from "../CardItem";
import { Link } from "react-router-dom";
import { ReactComponent as TeamUpdateIcons } from "../../assets/teamUpdateIcons.svg";
import { ReactComponent as DeleteIcons } from "../../assets/deleteIcons.svg";
import { formatDate } from "../../useFunctions/commonFunctions";

const TeamCard = ({ item, onClickUpdate }) => {
  const arrData = (arr) => {
    return arr.length > 0 ? arr?.map((el, i) => <Text key={i}>{el.name}</Text>) : <Text>N/A</Text>
  };
  console.log('item?.teamMembers', item?.teamMembers)
  return (
    <Card
      minWidth={1000}
    // avatarName={item?.teamName || ""}
    //   avatarSrc={"img"}
    >
      <Link to={`/teams/${item._id}`}>
        <HStack
          gap={7}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          padding={5}
          minWidth={1000}
        >
          <CardItem title={"Team Name"} value={item?.teamName} />
          <CardItem title={"Creation Date:"} value={formatDate(item?.createdAt)} />
          <CardItem title={"Last Update:"} value={formatDate(item?.updatedAt)} />
          <CardItem title={"Manager Name:"} component={arrData(item?.manager)} />
          <CardItem title={"Team Lead Name:"} component={arrData(item?.teamLead)} />
          <CardItem title={"Team Members:"} component={arrData(item?.agent)} />
          <CardItem title={"Total Members:"} value={item?.teamMembers?.length || 0} />
        </HStack>
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
          onClick={onClickUpdate}
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
