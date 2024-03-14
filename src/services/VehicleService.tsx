import ServiceBase from "./ServiceBase";
interface vehicleData {
    placa: string,
    anoDeFabricação: number,
    modelo: string,
    quilometragemAtual: number
}


class VehicleService extends ServiceBase {
  async createVehicle(data: vehicleData): Promise<any> {
    try {
      const response = await this.post(data, "vehicle");
      return response
    } catch (error: any) {
      return error;
    }
  }
}

const vehicleService = new VehicleService();

export default vehicleService;