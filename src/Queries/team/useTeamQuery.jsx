import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTeams } from "../../useFunctions/team/teamFunction";

export const useTeamQuery = ({ search }) => {
  return useInfiniteQuery
    ({
      queryKey: ["teams", {}],
      queryFn: ({ pageParam = 1 }) => getTeams({ pageParam, search }),
      getNextPageParam: (lastPage) => {
        console.log("Last Page in getNextPageParam:", lastPage);
        if (!lastPage || !lastPage.pagination) {
          console.error("Invalid lastPage or pagination data");
          return undefined; // No more pages
        }

        const { hasNext, currentPage } = lastPage.pagination;

        if (hasNext) {
          return currentPage + 1;
        }

        return undefined;
      },
      staleTime: 1000 * 60 * 10,
    });
}


