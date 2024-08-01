import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTeams } from "../../../useFunctions/team/teamFunction";
import { getUsers } from "../../../useFunctions/user/userFunctions";

export const useTeamQuery = ({ search }) => {

  let res = useInfiniteQuery({
    queryKey: ["teams", search],
    queryFn: ({ pageParam = 1 }) => getTeams({ pageParam, search }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.pagination?.hasNext ? parseInt(lastPage?.pagination?.currentPage) + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
  let data = []
  if (res) {
    data = res?.data?.pages?.map(page => page?.data).flat();
  }
  return { ...res, data }
}

export const useGetAgent = ({ search }) => {
  let res = useInfiniteQuery({
    queryKey: ["getUsers", 'agent', search],
    queryFn: ({ pageParam = 1 }) => getUsers({
      pageParam,
      search,
      status: 'approved',
      role: 'agent'
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.pagination?.hasNext ? parseInt(lastPage?.pagination?.currentPage) + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
  let data = []
  if (res) {
    data = res?.data?.pages?.map(page => page?.data).flat();
  }
  return { ...res, data }
}

export const useGetTeamLead = ({ search }) => {

  let res = useInfiniteQuery({
    queryKey: ["getUsers", 'teamLead', search],
    queryFn: ({ pageParam = 1 }) => getUsers({
      pageParam,
      search,
      status: 'approved',
      role: 'teamLead'
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.pagination?.hasNext ? parseInt(lastPage?.pagination?.currentPage) + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
  let data = []
  if (res) {
    data = res?.data?.pages?.map(page => page?.data).flat();
  }
  return { ...res, data }

}

export const useGetManager = ({ search }) => {

  let res = useInfiniteQuery({
    queryKey: ["getUsers", 'manager', search],
    queryFn: ({ pageParam = 1 }) => getUsers({
      pageParam,
      search,
      status: 'approved',
      role: 'manager'
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.pagination?.hasNext ? parseInt(lastPage?.pagination?.currentPage) + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
  let data = []
  if (res) {
    data = res?.data?.pages?.map(page => page?.data).flat();
  }
  return { ...res, data }

}






