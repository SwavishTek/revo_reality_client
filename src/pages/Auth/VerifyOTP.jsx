import React, { useState } from "react";
import AuthBack from "./AuthBack";
import {
  Box,
  Button,
  Center,
  Input,
  //   InputGroup,
  //   InputRightElement,
  Text,
} from "@chakra-ui/react";
import OTPInput from "../../components/OTPInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyOtp } from "../../useFunctions/auth/auth";
import useCustomToast from "../../hooks/useCustomToast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("pass");
  const { showError, showSuccess } = useCustomToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await verifyOtp({ email, otp });
      navigate("/dashboard");
      showSuccess({ message: data?.message });
    } catch (err) {
      console.error(err);
      // showError({ message: err?.response?.data?.message });
    }
  };

  return (
    <AuthBack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.1rem",
        }}
      >
        <Text as="b" fontSize={"1.8rem"}>
          OTP Authentication
        </Text>
        <div>
          <Text fontSize={"1rem"} fontWeight={"semibold"}>
            Send otp on registered email address ***email.com
          </Text>
        </div>

        <div>
          <Center>
            <Text as={"b"} fontSize={"1.4rem"}>
              OTP
            </Text>
          </Center>
          <OTPInput onChange={setOtp} />
          <Text
            color={"brand.500"}
            fontWeight={"bold"}
            fontSize={"0.8rem"}
            mt={2}
            textAlign={"right"}
          >
            Resend The OTP
          </Text>
        </div>
        <Button onClick={handleSubmit} colorScheme="brand" w={"100%"}>
          Login
        </Button>
      </Box>
    </AuthBack>
  );
};

export default VerifyOTP;
