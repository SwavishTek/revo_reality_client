import { Card, Flex, Text, IconButton } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";

const CustomToast = ({ message, t, bgColor }) => {
    const Icon = bgColor === 'green' ? CheckCircleIcon : WarningTwoIcon;
    const title = bgColor === 'green' ? 'Success' : 'Error';

    return (
        <Card
            padding="15px 20px"
            bgColor={bgColor}
            borderRadius="md"
            boxShadow="md"
            display="flex"
            alignItems="center"
            maxWidth={400}
            position="relative"
        >
            <Flex alignItems="center" width="100%" pr={12} justifyContent="space-between">
               
                <Icon boxSize={6} color="white" />
                
                <Text color="white" fontSize={15} flex="1" ml={3} pl={2}>
                    <strong>{title}</strong> <br />
                    {message}
                </Text>
                
                <IconButton
                    icon={<CloseIcon />}
                    variant="unstyled"
                    aria-label="Close"
                    color="white"
                    fontSize={12}
                    position="absolute"
                    cursor='pointer'
                    top="35%"
                    right={2}
                    transform="translateY(-50%)"
                    onClick={() => toast.dismiss(t.id)}
                />
            </Flex>
        </Card>
    );
};

export const showSuccess = (message) => {
    toast.custom((t) => <CustomToast message={message} t={t} bgColor="green" />, {
        duration: 3000,
        position: 'top-right',
    });
};

export const showError = (message) => {
    toast.custom((t) => <CustomToast message={message} t={t} bgColor="red" />, {
        duration: 3000,
        position: 'top-right',
    });
};
