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
    <Box display={"flex"} alignItems={"center"} gap={4} my={6}>
      <Box minWidth={{ md: "27rem" }}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          borderRadius={20}
        />
      </Box>
      {showDates && (
        <>
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => dateChange(date, setStartDate, onStartChange)}
              placeholderText="Select start date"
              customInput={<Input borderRadius={20} />}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => dateChange(date, setEndDate, onEndChange)}
              placeholderText="Select end date"
              customInput={<Input borderRadius={20} />}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Filters;
