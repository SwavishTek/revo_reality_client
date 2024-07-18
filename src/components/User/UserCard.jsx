import React from "react";
import Card from "../Card";
import { Wrap, WrapItem } from "@chakra-ui/react";
import CardItem from "../CardItem";
import CardActionButton from "../CardActionButton";

const UserCard = ({ item = {} }) => {
  return (
    <Card
      avatarName={item.name}
      //   avatarSrc={"img"}
      actionSection={<CardActionButton title={"hii"} />}
    >
      <Wrap spacingX={10} spacingY={5}>
        <WrapItem>
          <CardItem title={"Employee Name"} value={item.name || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem title={"Email Address"} value={item.email || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem title={"Mobile Number"} value={item.mobile || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem title={"Role"} value={item.role || "NA"} />
        </WrapItem>

        <WrapItem>
          <CardItem title={"Joining Date"} value={"jii" || "NA"} />
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
      </Wrap>
    </Card>
  );
};

export default UserCard;
