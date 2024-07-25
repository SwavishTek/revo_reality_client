import { Box, Card, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  return (
    <Box>
      <Header title="Settings" />
      <Card p={"2rem"} mt={6}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }} gap={6}>
          <GridItem colSpan={1} my={4}>
            <Title title="SETTING OPTIONS" />
          </GridItem>
          <GridItem>
            <Link to={"/users/changepassword"} style={{ fontWeight: "bold" }}>
              Change Password
            </Link>
          </GridItem>
          <GridItem>
            <Link to={"/users/generalchanges"} style={{ fontWeight: "bold" }}>
              General Settings
            </Link>
          </GridItem>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProfileSettings;
