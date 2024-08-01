import { useQuery } from "@tanstack/react-query";
import { getHolidayCount } from "../../../useFunctions/user/holidayCount.js";

export const useGetHolidayCount = ({ type }) => {
  return useQuery
  ({
    queryKey: ["getHolidayCount",type],
    queryFn: () => getHolidayCount({
      type
    }),
    staleTime: 1000 * 60 * 10,
  });
}




