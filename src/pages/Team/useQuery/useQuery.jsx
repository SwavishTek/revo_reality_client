import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTeams } from "../../../useFunctions/team/teamFunction";
import { getUsers } from "../../../useFunctions/user/userFunctions";

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

export const useGetAgent = ({ search }) => {
  return useInfiniteQuery
    ({
      queryKey: ["getUsers", 'agent', search],
      queryFn: ({ pageParam = 1 }) => getUsers({
        pageParam,
        search,
        status: 'approved',
        role: 'agent'
      }),
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

export const useGetTeamLead = ({ search }) => {
  return useInfiniteQuery
    ({
      queryKey: ["getUsers", 'teamLead', search],
      queryFn: ({ pageParam = 1 }) => getUsers({
        pageParam,
        search,
        status: 'approved',
        role: 'teamLead'
      }),
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

export const useGetManager = ({ search }) => {
  return useInfiniteQuery
    ({
      queryKey: ["getUsers", 'manager', search],
      queryFn: ({ pageParam = 1 }) => getUsers({
        pageParam,
        search,
        status: 'approved',
        role: 'teamLead'
      }),
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






