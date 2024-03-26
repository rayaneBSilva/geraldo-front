import axios from "axios";
import ServiceBase from "./ServiceBase";


export interface VehicleData {
  id: number
  model: string
}

interface selectVehicleId {
  [key: string]: any;
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
async selectVehicle(token: string, selectedId: selectVehicleId): Promise<string>{
  try {
    const response = await axios.post("https://geraldo-backend.vercel.app/select_vehicle",selectedId, {headers:{Authorization: `Bearer ${token}`}});
     return response.data.data.access_token;
  } catch(error:any){
    console.error("Erro ao selecionar veículo", error);
    console.log(error.message);
    console.log(error.response);
    console.log(error.toJSON());
    return "";
  }
}
}
const vehicleServiceList = new VehicleServiceList();

export default vehicleServiceList;
