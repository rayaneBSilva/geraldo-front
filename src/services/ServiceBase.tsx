import axios, { AxiosResponse } from "axios";
import Config from "../utils/Config";

interface UserData {
  [key: string]: any;
}

class ServiceBase {
  async post(data: UserData, endpoint: string): Promise<AxiosResponse> {
    return await axios.post(`${Config.API_URL}/${endpoint}`, data);
  }
}

const serviceBase = new ServiceBase();

export default ServiceBase;
