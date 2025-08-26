import apiClient from "./apiClient";
import { urls } from "./urls";

const client = apiClient;

export const signIn = async (body: { email: string; password: string }) => {
  const response = await client.post(urls.login, body);
  return response.data;
};

export const getUsers = async () => {
  const response = await client.get(urls.users);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await client.get(`${urls.user}${id}`);
  return response.data;
};
