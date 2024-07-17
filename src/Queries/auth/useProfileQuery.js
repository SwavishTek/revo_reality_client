import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../useFunctions/auth/auth";

export const useProfileQuery = () =>
  useQuery({
    queryKey: [],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 60,
  });
