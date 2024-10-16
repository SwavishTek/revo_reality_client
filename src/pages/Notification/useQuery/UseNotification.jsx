import { useQuery } from "@tanstack/react-query";
import { getNotification } from "./NotificationApi";

export const useGetNotification = ({ status, pageParam = 1 }) => {
  return useQuery({
    queryKey: ["getNotification", status, pageParam],
    queryFn: () => getNotification({ status, pageParam }),
    staleTime: 1000 * 60 * 10, // 10 minutes
    keepPreviousData: true,
    onSuccess: (data) => console.log('Fetched notifications:', data),
  });
}
