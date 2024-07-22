import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./uploadbutton.css";
import { AttachmentIcon } from "@chakra-ui/icons";
import UploadInput from "../UploadInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserDetailsQuery } from "../../Queries/user/userUserQuery";
import { addUser } from "../../useFunctions/user/userFunctions";

const UploadOfferLetter = ({ setCurrentStep }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: user, refetch } = useUserDetailsQuery(id);
  const [offerLetter, setOfferLetter] = useState([]);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const data = await addUser({
        step: 3,
        upload: { offerLetter },
        ...(!!id && { userId: id }),
      });
      refetch();
      toast({
        title: data?.message,
        status: "success",
        isClosable: true,
        duration: 1000,
      });
      navigate("/users");
      //   setCurrentStep((step) => step + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      setOfferLetter(user.offerLetter || []);
    }
  }, [user]);

  return (
    <>
      <Box
        bg={"white"}
        p={"2.5rem"}
        border={"1px solid #DCDCDC"}
        borderRadius={"6px"}
      >
        <h3
          style={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          UPLOAD OFFER LETTER{" "}
        </h3>
        <hr
          style={{
            color: "#DCDCDC",
            marginTop: "6px",
            width: "88%",
            marginBottom: "1.5rem",
          }}
        ></hr>
        <UploadInput
          onChange={(files) => {
            setOfferLetter(files);
          }}
        />

        <Stack spacing={6} direction="row" align="center" marginTop={"1.5rem"}>
          {/* <Button size="md" fontSize="18px" colorScheme="brand">
            Save
          </Button> */}
          <Button
            onClick={handleSubmit}
            size="md"
            fontSize="18px"
            colorScheme="brand"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default UploadOfferLetter;
