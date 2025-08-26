import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, getUsers, signIn } from "./fetchers";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (args: { email: string; password: string }) => signIn(args),
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
    enabled: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
