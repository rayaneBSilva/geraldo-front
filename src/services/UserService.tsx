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
      if (cnpj.isValid(data.username)){
        // O correto é MapScreen-To só desenvolv endo a minha tela
        navigation.navigate("MapScreen");
      }else{
        navigation.navigate("VehicleList");
      }
      
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;
