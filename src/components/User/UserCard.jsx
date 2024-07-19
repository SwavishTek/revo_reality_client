import React from "react";
import Card from "../Card";
import { Box, Grid, GridItem, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import CardItem from "../CardItem";
import UserActions from "./UserActions";
import { formatDate } from "../../useFunctions/commonFunctions";

const UserCard = ({ item = {}, refetch }) => {
  return (
    <Card
      avatarName={item.name}
      //   avatarSrc={"img"}
      actionSection={
        <UserActions status={item.status} userId={item._id} refetch={refetch} />
      }
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem>
          <CardItem title={"Employee Name"} value={item.name || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem title={"Email Address"} value={item.email || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem title={"Mobile Number"} value={item.mobile || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem title={"Role"} value={item.role || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem
            title={"Joining Date"}
            value={item.joiningDate ? formatDate(item.joiningDate) : "NA"}
          />
        </GridItem>
        <GridItem>
          <CardItem
            title={"Address line 1:"}
            value={item.currentAddress?.currentAdd || "NA"}
          />
        </GridItem>
        <GridItem>
          <CardItem
            title={"Address line 2:"}
            value={item.currentAddress?.currentAdd2 || "NA"}
          />
        </GridItem>
        <GridItem>
          <CardItem
            title={"City"}
            value={item.currentAddress?.currentCity || "NA"}
          />
        </GridItem>
        <GridItem>
          <CardItem
            title={"State"}
            value={item.currentAddress?.currentState || "NA"}
          />
        </GridItem>
        <GridItem>
          <CardItem
            title={"Country"}
            value={item.currentAddress?.currentCountry || "NA"}
          />
        </GridItem>
        <GridItem>
          <CardItem
            title={"Postal Code"}
            value={item.currentAddress?.currentPostCode || "NA"}
          />
        </GridItem>
      </Grid>

      {/* fuck */}

      {/* <Wrap spacingX={10} spacingY={5}>
        <WrapItem>
          <CardItem title={"Employee Name"} value={item.name || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem title={"Email Address"} value={item.email || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem title={"Role"} value={item.role || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem
            title={"Address line 1:"}
            value={item.currentAddress?.currentAdd || "NA"}
          />
        </WrapItem>

        <WrapItem>
          <CardItem
            title={"Address line 2:"}
            value={item.currentAddress?.currentAdd2 || "NA"}
          />
        </WrapItem>

        <WrapItem>
          <CardItem
            title={"City"}
            value={item.currentAddress?.currentCity || "NA"}
          />
        </WrapItem>

        <WrapItem>
          <CardItem
            title={"State"}
            value={item.currentAddress?.currentState || "NA"}
          />
        </WrapItem>

        <WrapItem>
          <CardItem
            title={"Country"}
            value={item.currentAddress?.currentCountry || "NA"}
          />
        </WrapItem>

        <WrapItem>
          <CardItem
            title={"Postal Code"}
            value={item.currentAddress?.currentPostCode || "NA"}
          />
        </WrapItem>
      </Wrap> */}
    </Card>
  );
};

export default UserCard;
