import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import MyContainer from "../../myComponent/MyContainer";
import { ShadowBox } from "../../myComponent/ShadowBox";
import RowItem from "../../myComponent/RowItem";
import { MainTitle } from "../../myComponent/MainTitle";
import { markNotificationsAsSeen } from './useQuery/NotificationApi'; 

const NotificationDetail = () => {
    const { state } = useLocation();
    const [loading, setLoading] = useState(true);
    const item = state?.item;

    const fetchNotification = async () => {
        console.log(state);
        if (state?.item?._id && state?.item?.status === 'unseen') {
            try {
                console.log('hii');
                await markNotificationsAsSeen(state.item._id);
                console.log('status:',state.item._id )
            } catch (error) {
                console.error("Error marking notification as seen:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (state?.item?._id) {
            fetchNotification();
        } else {
            setLoading(false); 
        }
    }, []);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    
    const formattedDate = item?.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A';

    return (
        <MyContainer isBack header={'Notification Detail'}>
            <ShadowBox
                containerStyle={{ width: '96%', padding: '50px 50px', marginBottom: '50px' }}
            >
                <MainTitle title={'Notification'} />
                <RowItem
                    containerStyle={{ alignItems: 'flex-start' }}
                    title={"Title"}
                    value={item?.title || 'N/A'}
                />
                <RowItem
                    containerStyle={{ alignItems: 'flex-start' }}
                    title={"Message"}
                    value={item?.message || 'N/A'}
                />
                <RowItem
                    containerStyle={{ alignItems: 'flex-start' }}
                    title={"Created Date"}
                    value={formattedDate} 
                />
            </ShadowBox>
        </MyContainer>
    );
};

export default React.memo(NotificationDetail);
