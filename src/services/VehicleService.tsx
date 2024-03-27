import { Alert } from "react-native";
import ServiceBase from "./ServiceBase";
export interface vehicleDTO {
    id?: number,
    plate: string,
    year: number,
    model: string,
    kilometers: number
}


class VehicleService extends ServiceBase {
  async createVehicle(data: vehicleDTO): Promise<any> {
    try {
      const response = await this.post(data, "vehicle");
      return response
    } catch (error: any) {
      Alert.alert("Erro ao criar veículo",error)
      return error;
    }
  }
}

const vehicleService = new VehicleService();

export default vehicleService;