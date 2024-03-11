import axios, { AxiosResponse } from "axios";

interface ForgotPasswordData {
  [key: string]: any;
}
class ForgotPasswordService {
  async recovery(data: ForgotPasswordData): Promise<AxiosResponse> {
    return await axios.post(`https://geraldo-backend.vercel.app/forgot_password`, JSON.stringify(data));
  }
}

const forgotPasswordService = new ForgotPasswordService();

export default forgotPasswordService;