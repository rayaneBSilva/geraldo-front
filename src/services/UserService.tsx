import ServiceBase from "./ServiceBase";
import { AxiosResponse } from "axios";

interface UserData {
  [key: string]: any;
}
class UserService extends ServiceBase {
  async login(data: UserData): Promise<AxiosResponse> {
    return await this.post(data, "login");
  }
}

const userService = new UserService();

export default userService;
