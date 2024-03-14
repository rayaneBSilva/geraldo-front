import axios, { AxiosResponse } from "axios";
import ServiceBase from "./ServiceBase";

interface ForgotPasswordData {
  [key: string]: any;
}
class ForgotPasswordService  extends ServiceBase {
  async recovery(data: ForgotPasswordData): Promise<AxiosResponse> {
    return await this.post(data, "forgot_password");
  }
}

const forgotPasswordService = new ForgotPasswordService();

export default forgotPasswordService;