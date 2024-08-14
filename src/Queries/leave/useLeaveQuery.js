import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getLeaveById,
  getLeaves,
} from "../../useFunctions/leave/leaveFunctions";

export const useLeaveQuery = ({ status = "", search = "", start, end }) => {
  let res = useInfiniteQuery({
    queryKey: ["leaves", { status, search, start, end }],
    queryFn: ({ pageParam = 1 }) => getLeaves({ pageParam, status, search, start, end }),
    getNextPageParam: (lastPage) => {
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
// useInfiniteQuery({
//   queryKey: ["leaves", { status, search, start, end }],
//   queryFn: ({ pageParam = 1 }) =>
//     getLeaves({ pageParam, status, search, start, end }),
//   getNextPageParam: (lastPage) => {
//     console.log("Last Page in getNextPageParam:", lastPage);

//     if (!lastPage || !lastPage.pagination) {
//       console.error("Invalid lastPage or pagination data");
//       return undefined; // No more pages
//     }

//     const { hasNext, currentPage } = lastPage.pagination;

//     if (hasNext) {
//       return currentPage + 1;
//     }

//     return undefined;
//   },
//   staleTime: 1000 * 60 * 10,
// });

export const useLeaveDetailsQuery = (id) =>
  useQuery({
    queryKey: ["leave", id],
    queryFn: () => getLeaveById(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
