import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOfferLetterDetailPublic, getOfferLetterList } from "../../useFunctions/offerLetter/offerLetter";

export const useGetOfferLetterList = ({ search = '' }) => {

  let res = useInfiniteQuery({
    queryKey: ["getOfferLetterList", search],
    queryFn: ({ pageParam = 1 }) => getOfferLetterList({ pageParam, search }),
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

export const useGetOfferLetterDetailPublic = () => {
  let res = useQuery({
    queryKey: ["getOfferLetterDetailPublic"],
    queryFn: () => getOfferLetterDetailPublic(),
    staleTime: 1000 * 60 * 10,
  })
  return res
}