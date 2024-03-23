import axios from "axios";
import ServiceBase from "./ServiceBase";

export interface VehicleData {
  id: number
  model: string
}

class VehicleServiceList extends ServiceBase{
  async getVehicles(token: string): Promise<VehicleData[]>{
  try {
    const response = await axios.get("https://geraldo-backend.vercel.app/vehicles", {headers:{Authorization: `Bearer ${token}`}});
    return response.data.data.map((vehicle:any) => ({
      id: vehicle.id,
      model: vehicle.model
    }));
  } catch(error:any){
    console.error("Erro ao obter veículos", error);
    console.log(error.message);
    console.log(error.response);
    console.log(error.toJSON());
    return[];
  }
}
}
const vehicleServiceList = new VehicleServiceList();

export default vehicleServiceList;
