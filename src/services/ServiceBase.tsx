import axios, { AxiosResponse } from "axios";
import Config from "../utils/Config";
import axiosInstance from "../utils/axiosInstance";
import { HistoryComponentData } from "./VehicheComponentService";

interface UserData {
  [key: string]: any;
}

class ServiceBase {
  async post(data: UserData, endpoint: string): Promise<AxiosResponse> {
    return await axiosInstance.post(`${Config.API_URL}/${endpoint}`, data);
  }

  async put(
    data: UserData,
    endpoint: string,
    token: string
  ): Promise<AxiosResponse> {
    return await axios.put(`${Config.API_URL}/${endpoint}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async get(endpoint: string, token: string): Promise<AxiosResponse> {
    return await axios.get(`${Config.API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async delete(endpoint: string, token: string): Promise<AxiosResponse> {
    return await axios.delete(`${Config.API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getHistory(
    endpoint: string,
    token: string
  ): Promise<HistoryComponentData[]> {
    return await axios.get(`${Config.API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async patch(
    data: UserData,
    endpoint: string,
    token: string
  ): Promise<AxiosResponse> {
    return await axios.patch(`${Config.API_URL}/${endpoint}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

const serviceBase = new ServiceBase();

export default ServiceBase;
