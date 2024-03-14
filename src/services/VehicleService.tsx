import ServiceBase from "./ServiceBase";
interface vehicleData {
    placa: string,
    anoDeFabricação: number,
    modelo: string,
    quilometragemAtual: number
}


class VehicleService extends ServiceBase {
  async createVehicle(data: vehicleData, navigation: any): Promise<void> {
    try {
      await this.post(data, "vehicle");
    } catch (error: any) {
      throw error;
    }
  }
}

const vehicleService = new VehicleService();

export default vehicleService;