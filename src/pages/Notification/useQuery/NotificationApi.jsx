import { API_AXIOS } from '../../../http/interceptor';

export const getNotification = async ({ status, pageParam = 1 }) => {
    try {
        const { data } = await API_AXIOS.get('notification', {
            params: {
                status, // seen, unseen
                page: pageParam,
                limit: 10
            }
        });
        return data || {};
    } catch (error) {
        console.log('getNotificationError', error);
        throw error;
    }
};

export const markNotificationsAsSeen = async (id) => {
    try {
        const { data } = await API_AXIOS.post(`notification/seen`, {
            id: id,
        });
        return data.data || {};
    } catch (err) {
        console.log("An unexpected error occurred", err);
        throw err;
    }
};
