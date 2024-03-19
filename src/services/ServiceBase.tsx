import axios, { AxiosResponse } from "axios";
import Config from "../utils/Config";

interface UserData {
  [key: string]: any;
}

class ServiceBase {
  async post(data: UserData, endpoint: string): Promise<AxiosResponse> {
    return await axios.post(`${Config.API_URL}/${endpoint}`, data);
  }

  async put(data: UserData, endpoint: string): Promise<AxiosResponse> {
    return await axios.put(`${Config.API_URL}/${endpoint}`, data);
  }

  async get(endpoint: string): Promise<AxiosResponse> {
    return await axios.get(`${Config.API_URL}/${endpoint}`);
  }
}

const serviceBase = new ServiceBase();

export default ServiceBase;
