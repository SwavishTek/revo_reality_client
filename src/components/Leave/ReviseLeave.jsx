import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import { API_AXIOS } from '../../http/interceptor';
import Apis from '../../utils/apis';
import { useQueryClient } from '@tanstack/react-query';
import LoadButton from '../LoadButton';
import ModalBlur from './ModalBlur'; // Import the new ModalBlur component
import { useLeaveActions } from '../../useFunctions/leave/leaveFunctions';

const ReviseLeave = ({ isOpen, onClose, id, refetch }) => {
  // const { data: user, refetch } = useUserDetailsQuery(id);
  const queryClient = useQueryClient();
  const { reviseLeaveById } = useLeaveActions();
  const [isLoading, setIsLoading] = useState()

  const { values, handleChange, handleSubmit, setFieldValue, isSubmitting } = useFormik({
    initialValues: {
      start: new Date(),
      end: new Date(),
      reviseRemarks: '',
    },
    onSubmit: async (value) => {
      setIsLoading(true);
      try {
        const resRevise = await reviseLeaveById({
          id,
          sendData: value
        })
        console.log('resRevise', resRevise)
        queryClient.invalidateQueries({ queryKey: ['leaves'] });
        if (refetch) refetch();
        onClose();
      } catch (err) {
        console.error(err);
      }
      finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <ModalBlur
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <LoadButton
            // isLoading={isSubmitting}
            isLoading={isLoading}
            colorScheme="brand"
            onClick={handleSubmit}
            mb="1rem"
          >
            Submit
          </LoadButton>
        </>
      }
      size="xl"
    >
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        my={4}
        gap={6}

      >
        <GridItem colSpan={2}>
          <Text fontSize="1.7rem" textAlign="center" my={4} fontWeight="bold">
            Revised Leave Dates
          </Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="semibold" mb={1}>Start Date</Text>
          <DatePicker
            name="start"
            selected={values.start}
            onChange={(date) => setFieldValue('start', date)}
            placeholderText="Select start date"
            minDate={new Date()}
            customInput={<Input />}
          />
        </GridItem>
        <GridItem>
          <Text fontWeight="semibold" mb={1}>End Date</Text>
          <DatePicker
            name="end"
            selected={values.end}
            onChange={(date) => setFieldValue('end', date)}
            placeholderText="Select end date"
            minDate={new Date()}
            customInput={<Input />}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontWeight="semibold" mb={1}>Reason/Remarks</Text>
          <Textarea
            name="reviseRemarks"
            value={values.reviseRemarks}
            onChange={handleChange}
            placeholder="Enter Remarks..."
          />
        </GridItem>
      </Grid>
    </ModalBlur>
  );
};

export default ReviseLeave;
