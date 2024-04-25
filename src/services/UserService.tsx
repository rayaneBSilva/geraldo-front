import { AxiosResponse } from "axios";
import ServiceBase from "./ServiceBase";
import { cnpj } from "cpf-cnpj-validator";
interface UserData {
  [key: string]: any;
}
class UserService extends ServiceBase {
  async login(data: UserData, navigation: any): Promise<AxiosResponse> {
    try {
      const response = await this.post(data, "login");     
      //TO-DO redirecionar para a pagina de vehicle component
      let isDriver = response.data.isDriver;
      if (isDriver){
        navigation.navigate("VehicleList");
      } else {
        navigation.navigate("MapScreen");
      }

      return response;
    } catch (error: any) {
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;
