import { AxiosResponse } from "axios";
import ServiceBase from "./ServiceBase";
interface UserData {
  [key: string]: any;
}
class UserService extends ServiceBase {
  async login(data: UserData, navigation: any): Promise<AxiosResponse> {
    try {
      const response = await this.post(data, "login");
      navigation.navigate("VehicheComponent");
      return response
    } catch (error: any) {
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;
