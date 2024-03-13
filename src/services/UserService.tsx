import ServiceBase from "./ServiceBase";
interface UserData {
  [key: string]: any;
}
class UserService extends ServiceBase {
  async login(data: UserData, navigation: any): Promise<void> {
    try {
      await this.post(data, "login");
      navigation.navigate("VehicheComponent");
    } catch (error: any) {
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;
