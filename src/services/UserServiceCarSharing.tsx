import ServiceBase from "./ServiceBase";
import axios from "axios";
import Config from "../utils/Config";

interface UserData {
  [key: string]: any;
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJUeXBlIjoiRFJJVkVSIiwicmVzZXRQYXNzd29yZCI6dHJ1ZSwiaWF0IjoxNzExMTU0NDkxLCJleHAiOjE4MTExNTQ0OTF9.VfbV9uhlNf_5nBBeTmBAyEv4VSpaI5EGOkrlBZ4h_PI';
class UserServiceCarSharing extends ServiceBase {
    async carSharing(data: UserData , idVehicle: String): Promise<any> {
    
        const headers = {
          'Authorization': `Bearer ${token}`

        }
         const result = await axios.post(`${Config.API_URL}/share_vehicle/${idVehicle}`, data, {headers});
         return result.data; 
  }
}
const userServiceCarSharing = new UserServiceCarSharing;

export default userServiceCarSharing;
