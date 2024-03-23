import ServiceBase from "./ServiceBase";
import axios from "axios";
import Config from "../utils/Config";
import token from "./token";

interface UserData {
  [key: string]: any;
}



class UserServiceCarSharing extends ServiceBase {
    async carSharing(data: UserData , idVehicle: string): Promise<any> {
    
        const headers = {
          'Authorization': `Bearer ${token}`

        }
         const result = await axios.post(`${Config.API_URL}/share_vehicle/${idVehicle}`, data, {headers});
         return result.data; 
  }
}
const userServiceCarSharing = new UserServiceCarSharing;

export default userServiceCarSharing;
