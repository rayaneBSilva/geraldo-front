import ServiceBase from "./ServiceBase";

interface UserData {
  [key: string]: any;
}
class UserServiceDriverRegister extends ServiceBase {
    async driverRegister(data: UserData, navigation: any): Promise<void> {
      console.log(data);
      try {
        await this.post(data, "driver_register");
        navigation.navigate("RegisterSuccesfully");
      } catch (error:any) {
        console.log("Driver register error: ", error.response.data);
    }
  }
}
const userServiceDriverRegister = new UserServiceDriverRegister();

export default userServiceDriverRegister;
