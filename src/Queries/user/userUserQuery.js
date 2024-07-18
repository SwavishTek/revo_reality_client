import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers } from "../../useFunctions/user/userFunctions";

export const useUserQuery = ({ status = "", search = "" }) =>
  useInfiniteQuery({
    queryKey: ["users", { status, search }],
    queryFn: ({ pageParam = 1 }) => getUsers({ pageParam, status, search }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage?.pagination?.hasNext) {
        return lastPage?.pagination?.currentPage + 1;
      }
      return undefined;
    },
  });
