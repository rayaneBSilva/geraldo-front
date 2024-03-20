import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as SecureStore from "expo-secure-store";

const baseURL = "https://geraldo-backend.vercel.app"; 

const axiosConfig: AxiosRequestConfig = {
  baseURL,
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
