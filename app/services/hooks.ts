import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { getUser, getUsers, register, signIn } from "./fetchers";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (args: { email: string; password: string }) => signIn(args),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (args: { email: string; password: string }) => register(args),
  });
};

export const useGetUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1; // next page
      }
      return undefined; // no more pages
    },
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
