import {
  Button,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import LoadButton from "../LoadButton";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import { API_AXIOS } from "../../http/interceptor";
import Apis from "../../utils/apis";
import { useQueryClient } from "@tanstack/react-query";

const ReviseLeave = ({ isOpen = false, onClose, id, refetch }) => {
  const queryClient = useQueryClient();
  const { values, handleChange, handleSubmit, setFieldValue, isSubmitting } =
    useFormik({
      initialValues: {
        start: new Date(),
        end: new Date(),
        reviseRemarks: "",
      },
      onSubmit: async (values) => {
        // onSubmit(values);
        console.log(values);
        try {
          const { data } = await API_AXIOS.post(
            `${Apis.leaveReviseById}/${id}`,
            values
          );

          queryClient.refetchQueries(["leaves"]);
          if (refetch) refetch();
          onClose();
        } catch (err) {
          console.log(err);
        }
      },
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            my={4}
            gap={6}
          >
            <GridItem colSpan={2}>
              <Text
                fontSize={"1rem"}
                textAlign={"center"}
                my={4}
                fontWeight={"bold"}
              >
                {"Revised Leave Dates"}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight={"semibold"} mb={1}>
                Start Date
              </Text>
              <DatePicker
                name="start"
                selected={values.start}
                onSelect={(date) => setFieldValue("start", date)}
                onChange={(date) => setFieldValue("start", date)}
                placeholderText="Select start date"
                minDate={new Date()}
                customInput={<Input />}
              />
            </GridItem>
            <GridItem>
              <Text fontWeight={"semibold"} mb={1}>
                End Date
              </Text>
              <DatePicker
                name="end"
                selected={values.end}
                onSelect={(date) => setFieldValue("end", date)}
                onChange={(date) => setFieldValue("end", date)}
                placeholderText="Select end date"
                minDate={new Date()}
                customInput={<Input />}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Text>Reason/Remarks</Text>
              <Input onChange={handleChange} />
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter alignItems={"center"} justifyContent={"center"} gap={4}>
          {/* <LoadButton
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancel
          </LoadButton> */}
          <LoadButton
            isLoading={isSubmitting}
            colorScheme={"brand"}
            onClick={handleSubmit}
          >
            Submit
          </LoadButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviseLeave;
