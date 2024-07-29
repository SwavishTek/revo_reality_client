import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const Filters = ({
  showDates = false,
  onSearchChange,
  onStartChange,
  onEndChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(searchTerm);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTime);
    };
  }, [searchTerm, onSearchChange]);

  const dateChange = (date, setState, extraChange) => {
    setState(date);
    if (extraChange) {
      extraChange(date);
    }
  };

  return (
    <Box display={"flex"} alignItems={"center"} gap={"10px"} my={6}>
      <Box minWidth={{ base: "10rem", sm: "15rem", md: "25rem" }}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderRadius={20}
          height={"2rem"}
          padding={"0.6rem 1rem 1rem"}
          background={"#fff"}
          width={"100%"}
          sx={{
            "::placeholder": {
              color: "#131313",
              fontSize: "15px",
              fontWeight: "500",
            },
          }}
        />
      </Box>
      {showDates && (
        <>
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => dateChange(date, setStartDate, onStartChange)}
              placeholderText="DD/MM/YYYY"
              customInput={<Input borderRadius={8} background={"#FFFFFF"} />}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => dateChange(date, setEndDate, onEndChange)}
              placeholderText="DD/MM/YYYY"
              customInput={<Input borderRadius={8} background={"#FFFFFF"} />}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Filters;
