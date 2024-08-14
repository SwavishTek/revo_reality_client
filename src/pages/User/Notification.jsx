import React, { useEffect, useState } from 'react';
import MyContainer from '../../myComponent/MyContainer';
import Filters from '../../components/Filters';
import CardHeader from '../../components/CardHeader';
import { userNotificationItems } from '../../utils/menuItems';
import InfiniteScrollList from '../../myComponent/InfiniteScrollList';
import NotificationListItem from './NotificationListItem';
import { Box, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { getNotification, markNotificationsAsSeen } from './useQuery/useNotification';

const Notification = () => {
    const [userStatus, setUserStatus] = useState("new");
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isLoading,
        isFetching,
        refetch,
    } = getNotification({ status: userStatus, search });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    useEffect(() => {
        const markNotifications = async () => {
            try {
                const sendData = [];
                const response = await markNotificationsAsSeen(sendData);
                console.log('NotificationReadData:', response);
            } catch (error) {
                console.error('NotificationReadDataError:', error);
                setError('Error marking notifications as seen.');
            }
        };

        markNotifications();
    }, []);

    if (status === "loading") {
        return <Text>Loading notifications...</Text>;
    }

    if (status === "error") {
        return <Text>Error fetching notifications.</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    const notifications = data?.pages?.flatMap((page) => page?.data || []) || [];

    return (
        <MyContainer header={'Notification'}>
            <Filters onSearchChange={setSearch} />
            <CardHeader
                value={userStatus}
                items={userNotificationItems}
                onChange={setUserStatus}
            />
            <Box>
                <InfiniteScrollList
                    containerStyle={{ paddingTop: '15px' }}
                    data={notifications}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    renderItem={(item) => (
                        <NotificationListItem
                            key={item._id}
                            description={item.status}
                            dateTime={new Date(item.createdAt).toLocaleString()}
                            onClickCheckbox={(v) => console.log('Checkbox clicked', v)}
                        />
                    )}
                    loadingMessage="Loading notifications..."
                    errorMessage="Error fetching notifications."
                    noDataMessage="No Notifications Available."
                />
            </Box>
            <Box ref={ref} />
        </MyContainer>
    );
};

export default Notification;
