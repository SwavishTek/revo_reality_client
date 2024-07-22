import React from "react";
import Card from "../Card";
import { Grid, GridItem } from "@chakra-ui/react";
import CardItem from "../CardItem";
import { formatDate } from "../../useFunctions/commonFunctions";
import { Link } from "react-router-dom";

const LeaveCard = ({ item = {}, refetch }) => {
  return (
    <Card
      avatarName={item.name}
      //   avatarSrc={"img"}
    >
      <Link to={`/leaves/${item._id}`}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem>
            <CardItem
              title={"Employee Name"}
              value={item.name || item.lastName || "NA"}
            />
          </GridItem>
          <GridItem>
            <CardItem title={"Leave For"} value={item.days || "NA"} />
          </GridItem>
          <GridItem>
            <CardItem
              title={"Start Date"}
              value={item.startDate ? formatDate(item.startDate) : "NA"}
            />
          </GridItem>
          <GridItem>
            <CardItem
              title={"End Date"}
              value={item.endDate ? formatDate(item.endDate) : "NA"}
            />
          </GridItem>
          <GridItem colSpan={5}>
            <CardItem title={"Reason For Leave"} value={item.reason || "NA"} />
          </GridItem>
        </Grid>
      </Link>
    </Card>
  );
};

export default LeaveCard;
