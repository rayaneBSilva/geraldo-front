import axios from "axios";
import ServiceBase from "./ServiceBase";

export interface VehicleData {
  id: number
  model: string
}

class VehicleServiceList extends ServiceBase{
  async getVehicles(): Promise<VehicleData[]>{
  try {
    const response = await axios.get("https://geraldo-backend.vercel.app/vehicles", {headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJUeXBlIjoiRFJJVkVSIiwicmVzZXRQYXNzd29yZCI6dHJ1ZSwidmVoaWNsZUlkIjoyLCJpYXQiOjE3MTExNTQ3MzMsImV4cCI6MTgxMTE1NDczM30.B6hyo09s8PTSvjUrLWqACrNMIkZpl8wQKiPQkIIBVI0"}});
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
