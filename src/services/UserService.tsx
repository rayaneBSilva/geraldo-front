import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import Config from "../utils/Config";

interface UserData {
  // FALTA Definir a estrutura do objeto 'data' aqui
}

class UserService {
  async login(data: UserData): Promise<AxiosResponse> {
    return axios({
      url: Config.API_URL + "usuario/login",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: Config.HEADER_REQUEST,
    })
      .then((response) => {
        AsyncStorage.setItem("TOKEN", response.data.access_token);
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const usuarioService = new UserService();
export default usuarioService;
