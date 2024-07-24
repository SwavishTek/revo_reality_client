import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const CustomPieChart = ({ lineWidth = 20, data = [] }) => {
  return (
    <Box p={4}>
      <PieChart lineWidth={lineWidth} data={data} animate={true} />

      <Box mt={2}>
        {data?.map((item) => (
          <>
            <Box
              key={item.title}
              //   color={item.color}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <div
                style={{
                  height: 10,
                  width: 10,
                  background: item.color,
                  borderRadius: "50%",
                }}
              ></div>
              <Text fontSize="sm" fontWeight="semibold">
                {item.title}
              </Text>
            </Box>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default CustomPieChart;
