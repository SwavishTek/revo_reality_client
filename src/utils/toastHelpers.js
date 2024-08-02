import { Card, HStack, Text } from "@chakra-ui/react";
import toast from "react-hot-toast";


const CustomToast = ({ message, t, bgColor = 'green' }) => (
    <Card
        padding={'15px 25px'}
        bgColor={bgColor}
        onClick={() => toast.dismiss(t.id)}
        mr={30}
    >
        <HStack>
            {/* icon */}
            <Text
                color={'white'}
                fontSize={15}
                textTransform={'capitalize'}
            >{message}</Text></HStack>
    </Card>
);

export const showSuccess = (message) => {
    toast.custom((t) => <CustomToast message={message} t={t} />, {
        duration: 3000,
        position: 'top-right',
    });
};

export const showError = (message) => {
    toast.custom((t) => <CustomToast message={message} t={t} bgColor={'red'} />, {
        duration: 3000,
        position: 'top-right',
    });
};
