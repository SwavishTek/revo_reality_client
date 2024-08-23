import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import MyContainer from '../../myComponent/MyContainer.jsx';
import Filters from '../../components/Filters.jsx';
import CardHeader from '../../components/CardHeader.jsx';
import InfiniteScrollList from '../../myComponent/InfiniteScrollList.jsx';
import NotificationListItem from './NotificationListItem.jsx';
import NoDataFound from '../User/components/NoDataFound.jsx';
import { userNotificationItems } from '../../utils/menuItems.js';
import { useGetNotification } from './useQuery/UseNotification.jsx';
import { markNotificationsAsSeen } from './useQuery/NotificationApi';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
    const [userStatus, setUserStatus] = useState("unseen");
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    const {
        data: allNotification,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isFetching,
    } = useGetNotification({ status: userStatus, pageParam: 1 });

    const handleBoxClick = async (item) => {
        try {
            navigate(`/users/notification/${item._id}`, { state: { item } });
        } catch (error) {
            setError("Error marking notification as seen");
        }
    };

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
                    data={Array.isArray(allNotification?.data) ? allNotification?.data : []}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    renderItem={(item) => (
                        <NotificationListItem
                            item={item}
                            title={item?.type}
                            message={item.message}
                            createdAt={new Date(item.createdAt).toLocaleString()}
                            onClickBox={() => handleBoxClick(item)} // Update click handler
                        />
                    )}
                    loadingMessage="Loading notifications..."
                    errorMessage="Error fetching notifications."
                    noDataMessage={
                        <NoDataFound message="No Notifications In The System" name="NoNotification" />
                    }
                    gap={3}
                />
            </Box>
        </MyContainer>
    );
};

export default Notification;
