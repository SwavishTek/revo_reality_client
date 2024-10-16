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
import LoadButton from "../LoadButton";
import { CustomBtn } from "../../myComponent/CustomBtn";
import { color } from "../../consts/color";

const UploadOfferLetter = ({ setCurrentStep }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: user, refetch } = useUserDetailsQuery(id);
  const [offerLetter, setOfferLetter] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await addUser({
        step: 3,
        upload: { offerLetter },
        ...(!!id && { userId: id }),
      });
      refetch();
      // toast({
      //   title: data?.message,
      //   status: "success",
      //   isClosable: true,
      //   duration: 1000,
      // });
      navigate("/users");
      //   setCurrentStep((step) => step + 1);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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

        <Box marginTop={'2rem'}>
          <CustomBtn
            title={"Previous"}
            onClick={() => {
              if (setCurrentStep) setCurrentStep((step) => step - 1);
            }}
            bgColor={color.secondaryBtn}
            containerStyle={{
              marginRight: "1.5rem",
            }}
          />
          <CustomBtn
            title={'Submit'}
            isLoading={loading}
            onClick={handleSubmit}
            bgColor={color.secondaryBtn}
            containerStyle={{
              marginRight: '1.5rem'
            }}
          />

        </Box>
      </Box>
    </>
  );
};

export default UploadOfferLetter;
