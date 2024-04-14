import ServiceBase from "./ServiceBase";
import axios from "axios";
import Config from "../utils/Config";


interface UserData {
  [key: string]: any;
}



class UserServiceHoursRegistration extends ServiceBase {
    async hoursRegistration(data: UserData , idEstablishment: string, token:string): Promise<any> {
    
        const headers = {
          'Authorization': `Bearer ${token}`

        }
         const result = await axios.post(`${Config.API_URL}/share_vehicle/${idEstablishment}`, data, {headers});
         return result.data; 
  }
}
const userServiceHoursRegistration = new UserServiceHoursRegistration;

export default UserServiceHoursRegistration;
