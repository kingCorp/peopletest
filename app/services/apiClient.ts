import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api", // your API base URL
  timeout: 120 * 1000, // optional: 10s timeout
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

// Request interceptor (e.g. add auth token)
apiClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g. handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const setHeaderToken = (token: string) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default apiClient;
