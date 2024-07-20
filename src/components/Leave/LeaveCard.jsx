import React from "react";
import Card from "../Card";
import { Grid, GridItem } from "@chakra-ui/react";
import CardItem from "../CardItem";
import { formatDate } from "../../useFunctions/commonFunctions";

const LeaveCard = ({ item = {}, refetch }) => {
  return (
    <Card
      avatarName={item.name}
      //   avatarSrc={"img"}
    >
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem>
          <CardItem title={"Employee Name"} value={item.name || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem title={"Leave For"} value={item.email || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem title={"Start Date"} value={item.mobile || "NA"} />
        </GridItem>
        <GridItem>
          <CardItem title={"End Date"} value={item.role || "NA"} />
        </GridItem>
        <GridItem colSpan={5}>
          <CardItem
            title={"Reason For Leave"}
            value={item.joiningDate ? formatDate(item.joiningDate) : "NA"}
          />
        </GridItem>
      </Grid>
    </Card>
  );
};

export default LeaveCard;
