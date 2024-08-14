import { useQuery } from "@tanstack/react-query";
import { getNotification } from "./useGetNotification";

export const useGetNotification = ({ status, pageParam = 1}) => {
  return useQuery
  ({
    queryKey: ["getNotification",type],
    queryFn: () => getNotification({
      status,
      pageParam : 1,
      limit 
    }),
    staleTime: 1000 * 60 * 10,
  });
}