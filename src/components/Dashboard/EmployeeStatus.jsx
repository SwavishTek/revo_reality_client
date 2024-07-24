import React from "react";
import Title from "../Title";
import { Box, Card, Text } from "@chakra-ui/react";
import CustomPieChart from "../CustomPieChart";

const PieChartComponent = ({ title, data = [] }) => {
  return (
    <Card p={4} height={"100%"}>
      <Text
        fontSize={"1.2rem"}
        textAlign={"center"}
        borderBottom={"1px solid black"}
        pb={2}
      >
        {title}
      </Text>

      <Box px={4} pt={4}>
        <CustomPieChart data={data} />
      </Box>
    </Card>
  );
};

export default PieChartComponent;
