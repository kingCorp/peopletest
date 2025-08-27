import apiClient from "./apiClient";
import { urls } from "./urls";

const client = apiClient;

export const signIn = async (body: { email: string; password: string }) => {
  const response = await client.post(urls.login, body);
  return response.data;
};

export const register = async (body: { email: string; password: string }) => {
  const response = await client.post(urls.register, body);
  return response.data;
};

export const getUsers = async ({ pageParam = 1 }) => {
  const response = await client.get(`${urls.users}?page=${pageParam}`);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await client.get(`${urls.user}${id}`);
  return response.data;
};
