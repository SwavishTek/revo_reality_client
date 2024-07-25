import { useToast } from "@chakra-ui/react";

const useCustomToast = () => {
  const toast = useToast();

  const showSuccess = ({ message, duration = 1000 }) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const showError = ({ message = "Something went wrong", duration = 1000 }) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return {
    showSuccess,
    showError,
  };
};

export default useCustomToast;
